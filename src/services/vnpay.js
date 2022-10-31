import { api } from '../utils';

// CHECKOUT VNPAY
export const checkoutVnpay = async (props = {}) => {
    try {
        await api.vnpayPost('/checkout', {
            amount: 3,
            bankCode: 'NCB',
            orderDescription: 'Thanh toan don hang',
            orderType: 'billpayment',
            language: 'vn',
        });
    } catch (err) {
        console.log(err.message);
    }
};
