const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productModel = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        imagesList: {
            type: [String],
            required: true,
        },
        priceImport: {
            type: Number,
            required: true,
        },
        dateImport: {
            type: String,
            required: true,
        },
        reducedPrice: {
            type: Number,
        },
        category: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        percentReduced: {
            type: Number,
        },
        likesStatus: {
            type: Boolean,
            required: true,
        },
        likesCount: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        sold: {
            type: Number,
            default: 0,
        },
        inventory: {
            type: Number,
            default: 0,
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
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Product', productModel);
