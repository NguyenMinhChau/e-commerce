const Shop = require('../Models/Shop');
const User = require('../Models/User');
const Product = require('../Models/Product');
const Feedback = require('../Models/Feedback');

const ShopController = {
    // [POST] /api/v1/shop/add
    addShop: async (req, res) => {
        try {
            const image = req.file.path
                .replace('src\\uploads\\', '/')
                .replace(/\\/g, '/');
            const shop = new Shop({
                ...req.body,
                image,
            });
            const newShop = await shop.save();
            if (req.body.user) {
                const user = User.findById(req.body.user);
                await user.updateOne({
                    $push: { shop: newShop._id },
                });
            }
            res.status(200).json({
                message: 'Add shop successfully',
                newShop,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    // [GET] /api/v1/shop/:id
    getShop: async (req, res) => {
        try {
            const shop = await Shop.findById(req.params.id);
            res.status(200).json({
                message: 'Get shop successfully',
                shop,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    // [GET] /api/v1/shop
    getAll: async (req, res) => {
        try {
            const { page, limit = 10 } = req.params;
            const totalData = await Shop.countDocuments();
            if (!page) {
                const shops = await Shop.find();
                res.status(200).json({
                    message: 'Get all shops successfully',
                    shops,
                    total: totalData,
                });
            } else {
                if (page < 1) {
                    page = 1;
                } else {
                    const shops = await Shop.find()
                        .skip((page - 1) * limit)
                        .limit(limit);
                    res.status(200).json({
                        message: 'Get all shops successfully',
                        shops,
                        total: totalData,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    // [PUT] /api/v1/shop/:id
    updateShop: async (req, res) => {
        try {
            const { id } = req.params;
            const shopOld = await Shop.findById(id);
            if (!shopOld) {
                res.status(404).json({ message: 'Shop not found' });
            } else {
                if (req.file) {
                    const image = req.file.path
                        .replace('src\\uploads\\', '/')
                        .replace(/\\/g, '/');
                    const shop = await Shop.findByIdAndUpdate(
                        id,
                        {
                            ...req.body,
                            image,
                        },
                        { new: true }
                    );
                    res.status(200).json({
                        message: 'Update shop successfully',
                        shop,
                    });
                } else {
                    const shop = await Shop.findByIdAndUpdate(
                        id,
                        {
                            ...req.body,
                        },
                        { new: true }
                    );
                    res.status(200).json({
                        message: 'Update shop successfully',
                        shop,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    // [DELETE] /api/v1/shop/:id
    deleteShop: async (req, res) => {
        try {
            const { id } = req.params;
            await User.updateMany(
                { shop: req.params.id },
                { $pull: { shop: req.params.id } }
            );
            await Product.updateMany(
                { shop: req.params.id },
                { $pull: { shop: req.params.id } }
            );
            await Feedback.updateMany(
                { shop: req.params.id },
                { $pull: { shop: req.params.id } }
            );
            const shop = await Shop.findByIdAndDelete(id);
            res.status(200).json({
                message: 'Delete shop successfully',
                shop,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
};

module.exports = ShopController;
