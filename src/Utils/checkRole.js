const checkRole = (req, res, next) => {
    if (req.user?.id === req.params?.id || req.user?.role === 'admin') next();
    else
        return res
            .status(403)
            .json({ message: 'You are not allowed to do this!' });
};

module.exports = checkRole;
