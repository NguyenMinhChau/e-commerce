import { api } from '../utils';

// SEND EMAIL CHECKOUT
export const SVsendEmailCheckout = async (props = {}) => {
    await api.emailPost('/sendEmailCheckout', {
        user: props?.currentUser,
        dataCart: props?.dataCartList,
    });
};
// SEND EMAIL MARKETING
export const SVsendEmailMarketing = async (props = {}) => {
    await api.emailPost('/emailMarketing', {
        userList: props?.userList,
        idProduct: props?.idProduct,
    });
};
// SEND EMAIL ORDER
export const SVsendEmailOrder = async (props = {}) => {
    await api.emailPost('/emailOrder', {
        user: props?.currentUser,
        dataCart: props?.dataCartList,
    });
};
