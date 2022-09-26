require('dotenv').config();
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    try {
        const acccessToken = req.headers.token || req.body.headers.token;
        if (!acccessToken)
            return res.status(400).json({ message: 'Invalid Authentication' });
        jwt.verify(
            acccessToken,
            process.env.JWT_ACCESS_TOKEN_SECRET,
            (err, user) => {
                if (err)
                    return res
                        .status(400)
                        .json({ message: 'Invalid Authentication Verify' });
                req.user = user;
                next();
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = checkToken;
