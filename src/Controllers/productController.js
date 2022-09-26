const Product = require('../Models/Product');
const FeedBack = require('../Models/Feedback');
const Shop = require('../Models/Shop');
const ProductController = {
    // [POST] /api/v1/product/add
    addProduct: async (req, res) => {
        try {
            const thumbnail = req.files.thumbnail[0].path
                .replace('src\\uploads\\', '/')
                .replace(/\\/g, '/');
            const imagesList = req.files.imagesList.reduce((acc, file) => {
                acc.push(
                    file.path.replace('src\\uploads\\', '/').replace(/\\/g, '/')
                );
                return acc;
            }, []);
            const product = new Product({
                ...req.body,
                thumbnail,
                imagesList,
            });
            const newProduct = await product.save();
            if (req.body.feedback) {
                const feedback = FeedBack.findById(req.body.feedback);
                await feedback.updateOne({
                    $push: { product: newProduct._id },
                });
            }
            if (req.body.shop) {
                const shop = Shop.findById(req.body.shop);
                await shop.updateOne({
                    $push: { product: newProduct._id },
                });
            }
            res.status(200).json({
                message: 'Add product successfully',
                newProduct,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    // [GET] /api/v1/product/:id
    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id).populate(
                'shop',
                'name address phone email image website product -_id'
            );
            res.status(200).json({ product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    // [GET] /api/v1/product
    getProducts: async (req, res) => {
        try {
            const { page, limit = 10 } = req.params;
            if (!page) {
                const products = await Product.find().populate(
                    'shop',
                    'name address phone email image website product -_id'
                );
                const totalData = await Product.countDocuments();
                res.status(200).json({
                    message: 'Get all products success!',
                    products,
                    total: totalData,
                });
            } else {
                if (page < 1) {
                    page = 1;
                } else {
                    const products = await Product.find().populate(
                        'shop',
                        'name address phone email image website product -_id'
                    );
                    const totalData = await Product.countDocuments();
                    res.status(200).json({
                        message: 'Get all products success!',
                        products,
                        total: totalData,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    // [PUT] /api/v1/product/:id
    updateProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (product) {
                if (req.files) {
                    if (req.files.thumbnail) {
                        const thumbnail = req.files.thumbnail[0].path
                            .replace('src\\uploads\\', '/')
                            .replace(/\\/g, '/');
                        req.body.thumbnail = thumbnail;
                    } else if (req.files.imagesList) {
                        const imagesList = req.files.imagesList.reduce(
                            (acc, file) => {
                                acc.push(
                                    file.path
                                        .replace('src\\uploads\\', '/')
                                        .replace(/\\/g, '/')
                                );
                                return acc;
                            },
                            []
                        );
                        req.body.imagesList = imagesList;
                    } else {
                        req.body.thumbnail = product.thumbnail;
                        req.body.imagesList = product.imagesList;
                    }
                    await product.updateOne({
                        $set: req.body,
                    });
                    const newProduct = await Product.findById(req.params.id);
                    res.status(200).json({
                        message: 'Update product successfully',
                        newProduct,
                    });
                } else {
                    await product.updateOne({
                        $set: req.body,
                    });
                    const newProduct = await Product.findById(req.params.id);
                    res.status(200).json({
                        message: 'Update product successfully',
                        newProduct,
                    });
                }
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    // [DELETE] /api/v1/product/:id
    deleteProduct: async (req, res) => {
        try {
            await Shop.updateMany(
                { product: req.params.id },
                { $pull: { product: req.params.id } }
            );
            await FeedBack.updateMany(
                { product: req.params.id },
                { $pull: { product: req.params.id } }
            );
            const product = await Product.findById(req.params.id);
            if (product) {
                await Product.findByIdAndDelete(req.params.id);
                res.status(200).json({
                    message: 'Delete product successfully',
                });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
};

module.exports = ProductController;
