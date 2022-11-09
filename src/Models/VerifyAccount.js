const mongoose = require('mongoose');

const VerifyAccountModal = new mongoose.Schema(
    {
        code: { type: String, default: '' },
        email: { type: String, default: '' },
        token: { type: String, default: '' },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

VerifyAccountModal.index({ createdAt: 1 }, { expireAfterSeconds: 180 });

module.exports = mongoose.model('VerifyAccount', VerifyAccountModal);
