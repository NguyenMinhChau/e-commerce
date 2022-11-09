require('dotenv').config();
const User = require('../Models/User');
const VerifyAccount = require('../Models/VerifyAccount');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const sendMailFunc = require('../utils/sendMail');
const authenController = {
    createRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id || user.id,
                role: user.role,
            },
            process.env.JWT_REFRESH_TOKEN_SECRET,
            {
                expiresIn: '1d',
            }
        );
    },
    createAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id || user._id,
                role: user.role,
            },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1d',
            }
        );
    },
    // [GET] /api/v1/authen/login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user)
                return res
                    .status(400)
                    .json({ message: 'User does not exist.' });
            if (user.block === true)
                return res.status(400).json({
                    code: 1,
                    message:
                        'Tài khoản của bạn đã bị khóa, vui lòng liên hệ với quản trị viên để biết thêm chi tiết.',
                });
            if (user.verify === false) {
                return res.status(400).json({
                    code: 1,
                    message:
                        'Tài khoản của bạn chưa được xác thực, vui lòng xác thực tài khoản để đăng nhập.',
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ message: 'Incorrect password.' });
            const access_token = authenController.createAccessToken(user);
            const refresh_token = authenController.createRefreshToken(user);
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                sameSite: 'strict',
                secure: false,
                path: '/',
                maxAge: 7 * 60 * 60 * 1000,
            });
            const { password: _, ...data } = user._doc;
            res.status(200).json({
                message: 'Login Success!',
                user: {
                    ...data,
                    token: access_token,
                },
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    // [GET] /api/v1/authen/register
    register: async (req, res) => {
        try {
            const { username, email, password, phone, address } = req.body;
            const user = await User.findOne({ email });
            if (user)
                return res
                    .status(400)
                    .json({ message: 'This email already exists.' });
            if (password.length < 6)
                return res.status(400).json({
                    message: 'Password is at least 6 characters long.',
                });
            const genSalt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, genSalt);
            const newUser = new User({
                username,
                email,
                password: passwordHash,
                phone,
                address,
            });
            const date = Date.now();
            const activation_token = jwt.sign(
                {
                    id: newUser._id,
                    email: newUser.email,
                    username: newUser.username,
                    date,
                },
                process.env.JWT_ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '5m',
                }
            );
            // generater otp
            const otp = otpGenerator.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            });
            const verify = new VerifyAccount({
                code: otp,
                email: newUser.email,
                token: activation_token,
                date,
            });
            await newUser.save();
            verify
                .save()
                .then((f) => {
                    if (f) {
                        const mailContentActivation = `
                            <p>Kính gửi: <strong><i>${newUser.username}</i></strong></p>
                            <p><i>Chúng tôi, bộ phận tiếp nhận thông tin khách hàng <span><a style='color: #ee4d2d' href='https://nguyenminhchau.site/'><u><strong>MEGAMART</strong></u></a></span>. Chúc mừng bạn đã đăng kí tài khoản thành công.</i></p>
                            <p>Mã OTP xác thực tài khoản: <u><i><b>${otp}</b></i></u></p>
                            <p><b>Mã OTP có hiệu lực trong 3 phút (tính từ khi email này được gửi đi).</b></p>
                            <p>Để thực hiện xác thực tài khoản. Vui lòng truy cập tại <a href='http://localhost:3001/user/activation_account/${activation_token}'><strong>here</strong></a></p>
                            <p><i>Đây là email tự động, vui lòng không trả lời email này.</i></p>

                            <p><strong><i>Trân trọng.</i></strong></p>
                            <div style='width: 100%; height: 1px; background-color: #ee4d2d; margin-bottom: 12px'></div>
                            <p><strong>Sàn giao dịch thương mại: <i><a style='color: #ee4d2d' href='https://nguyenminhchau.site/'>MegaMart</a></i></strong></p>
                            <p><strong>Hotline: <i><a style='color: red' href='tel:0398365404'>0398365404</a></i></strong></p>
                            <p><strong>Địa chỉ: <i><a style='color: red' href='https://goo.gl/maps/nYe6U42GEZKbSQio8'>Châu Thành - Tiền Giang</a></i></strong></p>
                            <p><strong>Slogan: <i style='color: red'>Chất lượng luôn đặt lên hàng đầu</i></strong></p>
                            <div style='width: 100%; height: 200px'>
                                <img src='https://images.unsplash.com/photo-1503437313881-503a91226402?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=2000' alt='MegaMart' style='width: 100%; height: 100%; object-fit: contain'/>
                            </div>
                        `;
                        let resultSendMail = sendMailFunc(
                            newUser.email,
                            mailContentActivation,
                            `MEGAMART - Xác thực cho tài khoản @${newUser.email}`
                        );
                        resultSendMail
                            .then((val) => {
                                return res.json({
                                    code: 0,
                                    message: `Send mail for verify account successfully to email = ${newUser.email}`,
                                });
                            })
                            .catch((err) => {
                                return res.json({
                                    code: 1,
                                    message: err?.message,
                                });
                            });
                    } else {
                        return res.json({
                            code: 2,
                            message: `Can not save model verify account of user with email = ${newUser.email}`,
                        });
                    }
                })
                .catch((err) => {
                    return res.json({
                        code: 1,
                        message: err?.message,
                    });
                });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    // [POST] /api/v1/authen/sendMailVerify
    sendMailVerify: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.json({
                    code: 1,
                    message: 'User not found.',
                });
            } else {
                const date = Date.now();
                const activation_token = jwt.sign(
                    {
                        id: user._id,
                        email: user.email,
                        username: user.username,
                        date,
                    },
                    process.env.JWT_ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '5m',
                    }
                );
                // generater otp
                const otp = otpGenerator.generate(6, {
                    lowerCaseAlphabets: false,
                    upperCaseAlphabets: false,
                    specialChars: false,
                });
                const verify = new VerifyAccount({
                    code: otp,
                    email: user.email,
                    token: activation_token,
                    date,
                });
                verify
                    .save()
                    .then((f) => {
                        if (f) {
                            const mailContentActivation = `
                            <p>Kính gửi: <strong><i>${user.username}</i></strong></p>
                            <p><i>Chúng tôi, bộ phận tiếp nhận thông tin khách hàng <span><a style='color: #ee4d2d' href='https://nguyenminhchau.site/'><u><strong>MEGAMART</strong></u></a></span>. Chúng tôi đã gửi cho bạn mã xác thực tài khoản.</i></p>
                            <p>Mã OTP xác thực tài khoản: <u><i><b>${otp}</b></i></u></p>
                            <p><b>Mã OTP có hiệu lực trong 3 phút (tính từ khi email này được gửi đi).</b></p>
                            <p>Để thực hiện xác thực tài khoản. Vui lòng truy cập tại <a href='http://localhost:3001/user/activation_account/${activation_token}'><strong>here</strong></a></p>
                            <p><i>Đây là email tự động, vui lòng không trả lời email này.</i></p>

                            <p><strong><i>Trân trọng.</i></strong></p>
                            <div style='width: 100%; height: 1px; background-color: #ee4d2d; margin-bottom: 12px'></div>
                            <p><strong>Sàn giao dịch thương mại: <i><a style='color: #ee4d2d' href='https://nguyenminhchau.site/'>MegaMart</a></i></strong></p>
                            <p><strong>Hotline: <i><a style='color: red' href='tel:0398365404'>0398365404</a></i></strong></p>
                            <p><strong>Địa chỉ: <i><a style='color: red' href='https://goo.gl/maps/nYe6U42GEZKbSQio8'>Châu Thành - Tiền Giang</a></i></strong></p>
                            <p><strong>Slogan: <i style='color: red'>Chất lượng luôn đặt lên hàng đầu</i></strong></p>
                            <div style='width: 100%; height: 200px'>
                                <img src='https://images.unsplash.com/photo-1503437313881-503a91226402?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=2000' alt='MegaMart' style='width: 100%; height: 100%; object-fit: contain'/>
                            </div>
                        `;
                            let resultSendMail = sendMailFunc(
                                user.email,
                                mailContentActivation,
                                `MEGAMART - Xác thực cho tài khoản @${user.email}`
                            );
                            resultSendMail
                                .then((val) => {
                                    return res.json({
                                        code: 0,
                                        message: `Send mail for verify account successfully to email = ${user.email}`,
                                    });
                                })
                                .catch((err) => {
                                    return res.json({
                                        code: 1,
                                        message: err?.message,
                                    });
                                });
                        } else {
                            return res.json({
                                code: 2,
                                message: `Can not save model verify account of user with email = ${user.email}`,
                            });
                        }
                    })
                    .catch((err) => {
                        return res.json({
                            code: 1,
                            message: err?.message,
                        });
                    });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    // [POST] /api/v1/authen/resendCode/:token
    resendCode: async (req, res) => {
        try {
            const { token } = req.params;
            if (!token) {
                return res.json({
                    code: 2,
                    message: 'A token is required',
                });
            } else {
                const date = Date.now();
                const decoded = jwt.verify(
                    token,
                    process.env.JWT_ACCESS_TOKEN_SECRET
                );
                const activation_token = jwt.sign(
                    { id: decoded._id, email: decoded.email, date },
                    process.env.JWT_ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '5m',
                    }
                );
                // generater otp
                const otp = otpGenerator.generate(6, {
                    lowerCaseAlphabets: false,
                    upperCaseAlphabets: false,
                    specialChars: false,
                });
                const verify = new VerifyAccount({
                    code: otp,
                    email: decoded.email,
                    token: activation_token,
                    date,
                });
                verify
                    .save()
                    .then((f) => {
                        if (f) {
                            const mailContentActivation = `
                                <p>Kính gửi: <strong><i>${decoded.username}</i></strong></p>
                                <p><i>Chúng tôi, bộ phận tiếp nhận thông tin khách hàng <span><a style='color: #ee4d2d' href='https://nguyenminhchau.site/'><u><strong>MEGAMART</strong></u></a></span>. Chúng tôi gửi lại bạn mã xác thực cho tài khoản.</i></p>
                                <p>Mã OTP xác thực tài khoản: <u><i><b>${otp}</b></i></u></p>
                                <p><b>Mã OTP có hiệu lực trong 3 phút (tính từ khi email này được gửi đi).</b></p>
                                <p>Để thực hiện xác thực tài khoản. Vui lòng truy cập tại <a href='http://localhost:3001/user/activation_account/${activation_token}'><strong>here</strong></a></p>
                                <p><i>Đây là email tự động, vui lòng không trả lời email này.</i></p>
    
                                <p><strong><i>Trân trọng.</i></strong></p>
                                <div style='width: 100%; height: 1px; background-color: #ee4d2d; margin-bottom: 12px'></div>
                                <p><strong>Sàn giao dịch thương mại: <i><a style='color: #ee4d2d' href='https://nguyenminhchau.site/'>MegaMart</a></i></strong></p>
                                <p><strong>Hotline: <i><a style='color: red' href='tel:0398365404'>0398365404</a></i></strong></p>
                                <p><strong>Địa chỉ: <i><a style='color: red' href='https://goo.gl/maps/nYe6U42GEZKbSQio8'>Châu Thành - Tiền Giang</a></i></strong></p>
                                <p><strong>Slogan: <i style='color: red'>Chất lượng luôn đặt lên hàng đầu</i></strong></p>
                                <div style='width: 100%; height: 200px'>
                                    <img src='https://images.unsplash.com/photo-1503437313881-503a91226402?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=2000' alt='MegaMart' style='width: 100%; height: 100%; object-fit: contain'/>
                                </div>
                            `;
                            let resultSendMail = sendMailFunc(
                                decoded.email,
                                mailContentActivation,
                                `MEGAMART - Gửi lại mã xác thực cho tài khoản @${decoded.email}`
                            );
                            resultSendMail
                                .then((val) => {
                                    return res.json({
                                        code: 0,
                                        message: `Send mail for resend code successfully to email = ${decoded.email}`,
                                    });
                                })
                                .catch((err) => {
                                    return res.json({
                                        code: 1,
                                        message: err?.message,
                                    });
                                });
                        } else {
                            return res.json({
                                code: 2,
                                message: `Can not save model verify account of user with email = ${decoded.email}`,
                            });
                        }
                    })
                    .catch((err) => {
                        return res.json({
                            code: 1,
                            message: err?.message,
                        });
                    });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    // [POST] /api/v1/authen/checkCodeVerify/:tokenVerify
    checkCodeVerify: async (req, res) => {
        const { token } = req.params;
        const { otp } = req.body;
        if (!token) {
            return res.json({
                code: 2,
                message: 'A token is required',
            });
        }
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_ACCESS_TOKEN_SECRET
            );
            VerifyAccount.findOne({ date: decoded.date }, (err, f) => {
                if (f) {
                    if (f.code === otp) {
                        User.findOne({ email: decoded.email }, (errs, user) => {
                            if (err)
                                return res.json({
                                    code: 1,
                                    message: err?.message,
                                });

                            if (user) {
                                user.verify = true;
                                user.save();
                                return res.json({
                                    code: 0,
                                    message: 'Verify account successfully',
                                });
                            } else {
                                return res.json({
                                    code: 2,
                                    message: `User is not valid with email = ${decoded.email}`,
                                });
                            }
                        });
                    } else {
                        return res.json({
                            code: 2,
                            message: `Otp iput is wrong or dead`,
                        });
                    }
                } else {
                    return res.json({
                        code: 2,
                        message: `Token is dead! Please order new Token for verify account`,
                    });
                }
            });
        } catch {
            return res.status(500).json({ message: err.message });
        }
    },
    // [POST] /api/v1/authen/logout
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken');
            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    // [POST] /api/v1/authen/refresh_token
    refreshToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token)
                return res
                    .status(400)
                    .json({ message: 'Please Login or Register' });
            jwt.verify(
                rf_token,
                process.env.JWT_REFRESH_TOKEN_SECRET,
                (err, user) => {
                    if (err)
                        return res
                            .status(400)
                            .json({ message: 'Please Login or Register' });
                    const access_token =
                        authenController.createAccessToken(user);
                    const refresh_token =
                        authenController.createRefreshToken(user);
                    res.cookie('refreshtoken', refresh_token, {
                        httpOnly: true,
                        sameSite: 'strict',
                        secure: false,
                        path: '/',
                        maxAge: 7 * 60 * 60 * 1000, // 1 day
                    });
                    res.status(200).json({
                        message: 'Access token has been refreshed',
                        newToken: access_token,
                    });
                }
            );
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
};

module.exports = authenController;
