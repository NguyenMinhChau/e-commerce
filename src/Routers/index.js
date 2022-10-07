const authenRouter = require('./authen');
const userRouter = require('./user');
const productRouter = require('./product');
const shopRouter = require('./shop');
const feedbackRouter = require('./feedback');
const cartRouter = require('./cart');
const stripeRouter = require('./stripe');

const router = (app) => {
    app.use('/api/v1/authen', authenRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/product', productRouter);
    app.use('/api/v1/shop', shopRouter);
    app.use('/api/v1/feedback', feedbackRouter);
    app.use('/api/v1/cart', cartRouter);
    app.use('/api/v1/stripe', stripeRouter);
};

module.exports = router;
