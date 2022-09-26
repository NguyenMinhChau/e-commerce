const User = require('../Models/User');

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
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
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
};

module.exports = userController;
