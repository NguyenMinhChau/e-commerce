require('dotenv').config();
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
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
                expiresIn: '60s',
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
            await newUser.save();
            const { password: _, ...data } = newUser._doc;
            const mailContent = `
                <p>Kính gửi: <strong><i>${data.username}</i></strong></p>
                <p><i>Chúng tôi, bộ phận tiếp nhận thông tin khách hàng <span style='color: #ee4d2d'><u><strong>MEGAMART</strong></u></span>. Chúc mừng bạn đã đăng kí tài khoản thành công.</i></p>
                <p>Để thực hiện đăng nhập. Vui lòng truy cập tại <a href='https://shopsmallnmc.netlify.app/login'><strong>here</strong></a></p>
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
            await sendMailFunc(
                data.email,
                mailContent,
                `MEGAMART - Thông báo kích hoạt tài khoản @${data.email}`
            );
            res.status(200).json({
                message: 'Registration Success!',
                user: data,
            });
        } catch (err) {
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
