const mongoose = require('mongoose');

const VerifyAccountModal = new mongoose.Schema(
    {
        code: { type: String, default: '' },
        token: { type: String, default: '' },
    },
    { timestamps: true }
);

VerifyAccountModal.index({ createdAt: 1 }, { expireAfterSeconds: 180 });

module.exports = mongoose.model('VerifyAccount', VerifyAccountModal);
