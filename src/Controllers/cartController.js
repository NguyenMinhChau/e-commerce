const Product = require('../Models/Product');
const Cart = require('../Models/Cart');
const CartController = {
    // [POST]: /api/v1/cart/addToCart/:id
    addToCart: async (req, res) => {
        const { id } = req.params;
        const { quantity } = req.body;
        const { id: userId } = req.user;
        const cart = await Cart.findOne({ userId });
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (!cart) {
            const newCart = new Cart({
                userId,
                products: [
                    {
                        productId: id,
                        quantity,
                        price: product.price,
                    },
                ],
            });
            await newCart.save();
            return res
                .status(200)
                .json({ message: 'Add to cart successfully' });
        }
        const index = cart.products.findIndex((item) => item.productId === id);
        if (index !== -1) {
            cart.products.push({
                productId: id,
                quantity,
                price: product.price,
            });
        } else {
            cart.products[index].quantity += quantity;
        }
        await cart.save();
        return res.status(200).json({ message: 'Add to cart successfully' });
    },
    // [PUT] /api/v1/cart/update/:id
    updateCart: async (req, res) => {
        const { id } = req.params;
        const { quantity } = req.body;
        const { userId } = req;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const index = cart.products.findIndex((item) => item.productId === id);
        if (index === -1) {
            return res.status(404).json({ message: 'Product not found' });
        }
        cart.products[index].quantity = quantity;
        await cart.save();
        return res.status(200).json({ message: 'Update successfully' });
    },
    // [DELETE] /api/v1/cart/delete/:id
    deleteCart: async (req, res) => {
        const { id } = req.params;
        const { userId } = req;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const index = cart.products.findIndex((item) => item.productId === id);
        if (index === -1) {
            return res.status(404).json({ message: 'Product not found' });
        }
        cart.products.splice(index, 1);
        await cart.save();
        return res.status(200).json({ message: 'Delete successfully' });
    },
};

module.exports = CartController;
