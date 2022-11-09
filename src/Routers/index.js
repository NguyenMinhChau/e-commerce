const authenRouter = require('./authen');
const userRouter = require('./user');
const productRouter = require('./product');
const shopRouter = require('./shop');
const feedbackRouter = require('./feedback');
const cartRouter = require('./cart');
const liveRouter = require('./live');
const stripeRouter = require('./stripe');
const emailRouter = require('./email');
const zaloRouter = require('./zalo');
const vnpayRouter = require('./vnpay');
const checkoutHomeRouter = require('./checkoutHome');
const baokimRouter = require('./baokim');
const tkdoanhthuRouter = require('./tkdoanhthu');

const router = (app) => {
    app.use('/api/v1/authen', authenRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/product', productRouter);
    app.use('/api/v1/shop', shopRouter);
    app.use('/api/v1/feedback', feedbackRouter);
    app.use('/api/v1/cart', cartRouter);
    app.use('/api/v1/live', liveRouter);
    app.use('/api/v1/stripe', stripeRouter);
    app.use('/api/v1/email', emailRouter);
    app.use('/api/v1/zalo', zaloRouter);
    app.use('/api/v1/vnpay', vnpayRouter);
    app.use('/api/v1/baokim', baokimRouter);
    app.use('/api/v1/checkoutHome', checkoutHomeRouter);
    app.use('/api/v1/tkdoanhthu', tkdoanhthuRouter);
};

module.exports = router;
