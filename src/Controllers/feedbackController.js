const Product = require('../Models/Product');
const Feedback = require('../Models/Feedback');
const User = require('../Models/User');
const Shop = require('../Models/Shop');
const feedbackController = {
    // [POST] api/v1/feedback/add
    addFeedBack: async (req, res) => {
        try {
            const imageList = req?.files?.imageList?.reduce((acc, file) => {
                acc.push(
                    file.path
                        .replace('src\\uploads\\', '/')
                        ?.replace(/\\/g, '/')
                );
                return acc;
            }, []);
            const feedback = new Feedback({
                ...req.body,
                imageList,
                user: req.user.id,
            });
            const newFeedback = await feedback.save();
            if (req.user.id) {
                const user = User.findById(req.user.id);
                await user.updateOne({
                    $push: { feedback: newFeedback._id },
                });
            }
            if (req.body.product) {
                const product = Product.findById(req.body.product);
                await product.updateOne({
                    $push: { feedback: newFeedback._id },
                });
            }
            if (req.body.shop) {
                const shop = Shop.findById(req.body.shop);
                await shop.updateOne({
                    $push: { feedback: newFeedback._id },
                });
            }
            res.status(200).json({
                message: 'Add feedback successfully',
                newFeedback,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    // [GET] api/v1/feedback
    getFeedBacks: async (req, res) => {
        try {
            const { page, limit = 10 } = req.params;
            if (!page) {
                const feedbacks = await Feedback.find();
                const totalData = await Feedback.countDocuments();
                res.status(200).json({
                    message: 'Get all feedbacks success!',
                    feedbacks,
                    total: totalData,
                });
            } else {
                if (page < 1) {
                    page = 1;
                } else {
                    const feedbacks = await Feedback.find()
                        .skip((page - 1) * limit)
                        .limit(limit);
                    const totalData = await Feedback.countDocuments();
                    res.status(200).json({
                        message: 'Get all feedbacks success!',
                        feedbacks,
                        total: totalData,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    // [GET] api/v1/feedback/:id
    getFeedBack: async (req, res) => {
        try {
            const feedback = await Feedback.findById(req.params.id);
            res.status(200).json({ feedback });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    // [PUT] api/v1/feedback/:id
    updateFeedBack: async (req, res) => {
        try {
            const feedback = await Feedback.findById(req.params.id);
            if (feedback) {
                if (req.files) {
                    if (req.files.imageList) {
                        const imageList = req.files.imageList.reduce(
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
                        await feedback.updateOne({
                            ...req.body,
                            imageList,
                        });
                    }
                } else {
                    await feedback.updateOne({
                        ...req.body,
                    });
                }
                const updatedFeedback = await Feedback.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json({
                    message: 'Update feedback successfully',
                    updatedFeedback,
                });
            } else {
                res.status(404).json({ message: 'Feedback not found' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    // [DELETE] api/v1/feedback/:id
    deleteFeedBack: async (req, res) => {
        try {
            await Shop.updateMany(
                { feedback: req.params.id },
                { $pull: { feedback: req.params.id } }
            );
            await Product.updateMany(
                { feedback: req.params.id },
                { $pull: { feedback: req.params.id } }
            );
            await User.updateMany(
                { feedback: req.params.id },
                { $pull: { feedback: req.params.id } }
            );
            const feedback = await Feedback.findById(req.params.id);
            if (feedback) {
                await feedback.deleteOne();
                res.status(200).json({
                    message: 'Delete feedback successfully',
                });
            } else {
                res.status(404).json({ message: 'Feedback not found' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    // [GET] api/v1/feedback/getByIdProduct/:id
    getFeedBackByIdProduct: async (req, res) => {
        try {
            const feedbacks = await Feedback.find({
                product: { $in: [req.params.id] },
            }).populate('user', 'username email role rank shop _id');
            res.status(200).json({ feedbacks });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
};

module.exports = feedbackController;
