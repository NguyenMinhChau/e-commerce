require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const StripController = {
    checkout: async (req, res) => {
        try {
            const cartList = req.body.dataCartList.reduce((acc, item) => {
                acc.push({
                    price_data: {
                        currency: 'vnd',
                        product_data: {
                            name: item?.name,
                            description: item.description,
                            images: [
                                `${process.env.URL_CLIENT}${item.thumbnail}`,
                            ],
                            metadata: {
                                id: item.userId,
                            },
                        },
                        unit_amount: item.price,
                    },
                    quantity: item.quantity,
                });
                return acc;
            }, []);
            const session = await stripe.checkout.sessions.create({
                line_items: cartList,
                mode: 'payment',
                success_url: `${process.env.URL_CLIENT}`,
                cancel_url: `${process.env.URL_CLIENT}cart`,
            });

            res.send({ url: session.url });
        } catch (err) {
            console.log(err);
        }
    },
};

module.exports = StripController;
