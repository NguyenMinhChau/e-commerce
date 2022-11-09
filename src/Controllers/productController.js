const Product = require('../Models/Product');
const FeedBack = require('../Models/Feedback');
const Shop = require('../Models/Shop');
const ProductController = {
    // [POST] /api/v1/product/add
    addProduct: async (req, res) => {
        try {
            const thumbnail = req?.files?.thumbnail[0]?.path
                .replace('src\\uploads\\', '/')
                .replace(/\\/g, '/');
            const imagesList = req?.files?.imagesList?.reduce((acc, file) => {
                acc.push(
                    file?.path
                        ?.replace('src\\uploads\\', '/')
                        .replace(/\\/g, '/')
                );
                return acc;
            }, []);
            const product = new Product({
                ...req.body,
                thumbnail,
                imagesList,
            });
            const newProduct = await product.save();
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
    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id).populate(
                'shop',
                'name address phone email image website product _id'
            );
            res.status(200).json({ product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    // [GET] /api/v1/product/:id
    getProductBySlug: async (req, res) => {
        try {
            const product = await Product.findOne({
                slug: req.params.slug,
            }).populate(
                'shop',
                'name address phone email image website product _id'
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
            const { page, limit = 10, category } = req.query;
            if (!page && !category) {
                const products = await Product.find().populate(
                    'shop',
                    'name address phone email image website product _id'
                );
                const totalData = await Product.countDocuments();
                res.status(200).json({
                    message: 'Get all products success!',
                    products,
                    total: totalData,
                });
            } else {
                const objectFind = category
                    ? {
                          $text: {
                              $search: '"' + category.toString() + '"',
                              $caseSensitive: false,
                          },
                          $meta:
                              category.toString() +
                              '="' +
                              category.toString() +
                              '"',
                      }
                    : {};
                const products = await Product.find(objectFind)
                    .populate(
                        'shop',
                        'name address phone email image website product _id'
                    )
                    .skip((page - 1) * limit)
                    .limit(limit * 1)
                    .sort({ createdAt: -1 });
                const totalData = await Product.countDocuments();
                res.status(200).json({
                    message: 'Get all products success!',
                    products,
                    total: category ? products.length : totalData,
                    length: products.length,
                });
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
                    const thumbnail = req?.files?.thumbnail
                        ? req?.files?.thumbnail[0]?.path
                              .replace('src\\uploads\\', '/')
                              .replace(/\\/g, '/')
                        : product?.thumbnail;
                    const imagesList = req?.files?.imagesList
                        ? req?.files?.imagesList?.reduce((acc, file) => {
                              acc.push(
                                  file?.path
                                      ?.replace('src\\uploads\\', '/')
                                      .replace(/\\/g, '/')
                              );
                              return acc;
                          }, [])
                        : product?.imagesList;
                    const updateProduct = await Product.findByIdAndUpdate(
                        req.params.id,
                        {
                            ...req.body,
                            thumbnail,
                            imagesList,
                        },
                        { new: true }
                    );
                    res.status(200).json({
                        message: 'Update product successfully',
                        updateProduct,
                    });
                } else {
                    const updateProduct = await Product.findByIdAndUpdate(
                        req.params.id,
                        {
                            ...req.body,
                        },
                        { new: true }
                    );
                    res.status(200).json({
                        message: 'Update product successfully',
                        updateProduct,
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
    // [GET] /api/v1/product/findPrice
    findPrice: async (req, res) => {
        try {
            // tìm kiếm theo min -> max của giá và phân trang
            const {
                page = 1,
                limit = 10,
                category,
                minPrice,
                maxPrice,
            } = req.query;
            if (!minPrice || !maxPrice) {
                res.status(400).json({
                    message: 'Min price and max price is required',
                });
            } else if (!page && !category) {
                const products = await Product.find({
                    price: {
                        $gte: minPrice.toString(),
                        $lte: maxPrice.toString(),
                    },
                })
                    .populate(
                        'shop',
                        'name address phone email image website product _id'
                    )
                    .sort({ createdAt: -1 });
                const totalData = await Product.countDocuments();
                res.status(200).json({
                    message: 'Get all products success!',
                    products,
                    total: totalData,
                });
            } else {
                const objectFind = category
                    ? {
                          $text: {
                              $search: '"' + category.toString() + '"',
                              $caseSensitive: false,
                          },
                          $meta:
                              category.toString() +
                              '="' +
                              category.toString() +
                              '"',
                          price: { $gte: minPrice, $lte: maxPrice },
                      }
                    : {
                          price: { $gte: minPrice, $lte: maxPrice },
                      };
                const products = await Product.find(objectFind)
                    .populate(
                        'shop',
                        'name address phone email image website product _id'
                    )
                    .skip((page - 1) * limit)
                    .limit(limit * 1)
                    .sort({ createdAt: -1 });
                const totalData = await Product.countDocuments();
                res.status(200).json({
                    message: 'Get all products success!',
                    products,
                    total: minPrice && maxPrice ? products.length : totalData,
                });
            }
        } catch (err) {
            res.status(500).json({ message: 'Server Error' });
        }
    },
};

module.exports = ProductController;
