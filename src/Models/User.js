const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            default: 'user',
        },
        rank: {
            type: String,
            default: 'Standard',
        },
        feedback: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Feedback',
            },
        ],
        shop: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Shop',
            },
        ],
        product: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('User', userModel);
