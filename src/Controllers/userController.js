const User = require('../Models/User');
const Forgot = require('../Models/Forgot');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const sendMailFunc = require('../utils/sendMail');
const jwt = require('jsonwebtoken');

const userController = {
    // [GET] /api/v1/users/getUser/:id
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user)
                return res
                    .status(400)
                    .json({ message: 'User does not exist.' });
            const { password: _, ...data } = user._doc;
            res.status(200).json({
                message: 'Get user success!',
                user: data,
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    // [GET] /api/v1/users/getall
    getAllUsers: async (req, res) => {
        try {
            let { page, limit = 10 } = req.query;
            if (!page) {
                const users = await User.find();
                const totalData = await User.countDocuments();
                res.status(200).json({
                    message: 'Get all users success!',
                    users,
                    total: totalData,
                });
            } else {
                if (page < 1) {
                    page = 1;
                }
                const users = await User.find()
                    .skip((page - 1) * limit)
                    .limit(limit);
                const totalData = await User.countDocuments();
                res.status(200).json({
                    message: 'Get all users success!',
                    users,
                    total: totalData,
                });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    // [PUT] /api/v1/users/:id
    updateUser: async (req, res) => {
        try {
            if (req.body.password) {
                return res.status(400).json({
                    message: 'You can not update password!',
                });
            }
            if (req.body.phone || req.body.address) {
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: {
                        ...req.body,
                        phone: req?.body?.phone,
                        address: req?.body?.address,
                    },
                });
            } else {
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                });
            }
            const userUpdate = await User.findById(req.params.id);
            res.status(200).json({
                message: 'Update user success!',
                userUpdate,
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    // [DELETE] /api/v1/users/:id
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: 'Delete user success!',
                user,
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    // [POST] /api/v1/users/forgotPwd
    forgotPwd: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({
                    message: 'Email does not exist!',
                });
            } else {
                const token = jwt.sign(
                    { id: user._id, email: user.email },
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
                const forgot = new Forgot({
                    code: otp,
                    email: user.email,
                    token: token,
                });
                forgot
                    .save()
                    .then((f) => {
                        if (f) {
                            const mailContent = `
                                <p>Kính gửi: <strong><i>${user.username}</i></strong></p>
                                <p><i>Chúng tôi, bộ phận tiếp nhận thông tin khách hàng <span style='color: #ee4d2d'><u><strong>MEGAMART</strong></u></span> gửi đến bạn URL thực hiện cập nhật mật khẩu.</i></p>
                                <p>Chú ý: <strong>Không được chia sẻ mã này cho bất kì ai để đảm bảo an toàn tuyệt đối cho tài khoản.<u><i style='color: #ee4d2d; font-weight: bold'>Mật khẩu có hiệu lực trong vòng 5 phút.</i></u></strong></p>
                                <p>Mã OTP: <strong><u><i>${otp}</i></u></strong></p>
                                <p>Để thực hiện refresh mật khẩu. Vui lòng truy cập tại <a href='https://megamartnmc.netlify.app/getOTP/${token}'><strong>here</strong></a></p>
                                <p><i>Đây là email tự động, vui lòng không trả lời email này.</i></p>

                                <p><strong><i>Trân trọng.</i></strong></p>
                                <div style='width: 100%; height: 1px; background-color: #ee4d2d; margin-bottom: 12px'></div>
                                <p><strong>Sàn giao dịch thương mại: <i style='color: #ee4d2d'>MegaMart</i></strong></p>
                                <p><strong>Hotline: <i style='color: red'>0398365404</i></strong></p>
                               <p><strong>Địa chỉ: <i style='color: red'>Châu Thành - Tiền Giang</i></strong></p>
                                <p><strong>Slogan: <i style='color: red'>Chất lượng luôn đặt lên hàng đầu</i></strong></p>
                                <div style='width: 100%; height: 200px'>
                                    <img src='https://images.unsplash.com/photo-1503437313881-503a91226402?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=2000' alt='MegaMart' style='width: 100%; height: 100%; object-fit: contain'/>
                                </div>
                            `;
                            let resultSendMail = sendMailFunc(
                                user.email,
                                mailContent,
                                `MEGAMART - Cập nhật lại mật khẩu cho tài khoản @${user.email}`
                            );
                            resultSendMail
                                .then((val) => {
                                    return res.json({
                                        code: 0,
                                        message: `Send mail for forgot password successfully to email = ${user.email}`,
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
                                message: `Can not save model forgot of user with email = ${user.email}`,
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
            return res.status(500).json({ message: err?.message });
        }
    },
    // [PUT] api/v1/users/getOTP/:token
    getOTP(req, res) {
        const { token } = req.params;
        const { otp, pwd } = req.body;

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
            Forgot.findOne({ email: decoded.email }, (err, f) => {
                if (f) {
                    if (f.code === otp) {
                        User.findOne({ email: decoded.email }, (errs, user) => {
                            if (err)
                                return res.json({
                                    code: 1,
                                    message: err?.message,
                                });

                            if (user) {
                                bcrypt.hash(pwd, 10).then((hashed) => {
                                    if (hashed) {
                                        user.password = hashed;
                                        user.save()
                                            .then((u) => {
                                                if (u) {
                                                    return res.json({
                                                        code: 0,
                                                        message: `Change password successfully of user with email = ${decoded.email}`,
                                                    });
                                                } else {
                                                    return res.json({
                                                        code: 2,
                                                        message: `Can not change password for user with email = ${decoded.email}`,
                                                    });
                                                }
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
                                            message: `Can not hash password`,
                                        });
                                    }
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
                        message: `Token is dead! Please order new Token for reset password`,
                    });
                }
            });
        } catch (err) {
            return res.json({
                code: 2,
                message: 'In valid token',
            });
        }
    },
};

module.exports = userController;
