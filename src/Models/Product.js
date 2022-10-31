const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const productModel = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: { type: String, slug: 'name', unique: true },
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
            // required: true,
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
            default: false,
            // required: true,
        },
        likesCount: {
            type: Number,
            default: 0,
            // required: true,
        },
        rating: {
            type: String,
            default: '0',
        },
        sold: {
            type: Number,
            default: 0,
        },
        inventory: {
            type: Number,
            default: 0,
        },
        trending: {
            type: Boolean,
            default: false,
        },
        bigSales: {
            type: Boolean,
            default: false,
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
// productModel.index({
//     category: 'text',
//     // brand: 'category',
//     // slug: 'category',
//     // price: 'category',
// });
module.exports = mongoose.model('Product', productModel);
