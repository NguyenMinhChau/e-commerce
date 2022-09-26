const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopModel = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        website: {
            type: String,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        product: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        feedback: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Feedback',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Shop', shopModel);
