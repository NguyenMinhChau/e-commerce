const mongoose = require('mongoose');

const ForgotModal = new mongoose.Schema(
    {
        code: { type: String, default: '' },
        email: { type: String, default: '' },
        token: { type: String, default: '' },
    },
    { timestamps: true }
);

ForgotModal.index({ createdAt: 1 }, { expireAfterSeconds: 180 });

module.exports = mongoose.model('Forgot', ForgotModal);
