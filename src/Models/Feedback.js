const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackModel = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        imageList: {
            type: [String],
        },
        rating: {
            type: Number,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        product: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        shop: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Shop',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Feedback', feedbackModel);
