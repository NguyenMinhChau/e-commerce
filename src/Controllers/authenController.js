require('dotenv').config();
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
            const { username, email, password } = req.body;
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
            });
            await newUser.save();
            const { password: _, ...data } = newUser._doc;
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
