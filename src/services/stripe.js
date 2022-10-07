import { api } from '../utils';

// CHECKOUT STRIPE
export const checkoutStripe = async (props = {}) => {
    try {
        const resPost = await api.stripePost('/checkout', {
            dataCartList: props?.dataCartList,
            user: props?.currentUser,
        });
        if (resPost.url) {
            window.location.href = resPost.url;
        }
    } catch (err) {
        console.log(err.message);
    }
};
