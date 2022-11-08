const Product = require('../Models/Product');

const TkDoanhThu = {
    // [GET] /api/v1/tkdoanhthu/getall
    getDoanhThu: async (req, res) => {
        try {
            const products = await Product.find();
            if (!products) {
                return res
                    .status(400)
                    .json({ message: 'Không có sản phẩm nào' });
            } else {
                const { page = 1, limit = 10 } = req.query;
                if (!page) {
                    const data = [];
                    const totalData = await Product.countDocuments();
                    await products.forEach((product) => {
                        // priceImport, price, reducedPrice, sold, inventory
                        const {
                            priceImport,
                            price,
                            reducedPrice,
                            sold,
                            inventory,
                            dateImport,
                        } = product;
                        const von = priceImport * inventory;
                        const ban =
                            ((reducedPrice ? reducedPrice : price) -
                                priceImport) *
                            sold;
                        const loiNhuan = ban - von;
                        data.push({
                            name: product.name,
                            id: product._id,
                            von,
                            ban,
                            loiNhuan,
                            dateImport,
                        });
                    });
                    return res.status(200).json({
                        message: 'Get all products success!',
                        data,
                        totalData: totalData,
                    });
                } else {
                    const products = await Product.find({})
                        .skip((page - 1) * limit)
                        .limit(limit * 1);
                    const data = [];
                    const totalData = await Product.countDocuments();
                    await products.forEach((product) => {
                        // priceImport, price, reducedPrice, sold, inventory
                        const {
                            priceImport,
                            price,
                            reducedPrice,
                            sold,
                            inventory,
                            dateImport,
                        } = product;
                        const von = priceImport * inventory;
                        const ban =
                            ((reducedPrice ? reducedPrice : price) -
                                priceImport) *
                            sold;
                        const loiNhuan = ban - von;
                        data.push({
                            name: product.name,
                            id: product._id,
                            von,
                            ban,
                            loiNhuan,
                            dateImport,
                        });
                    });
                    return res.status(200).json({
                        message: 'Get all products success!',
                        data,
                        totalData: totalData,
                    });
                }
            }
        } catch (err) {
            return res.status(500).json({ meaasge: err.message });
        }
    },
};

module.exports = TkDoanhThu;
