const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartModel = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                price: {
                    type: Number,
                    default: 0,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Cart', cartModel);
