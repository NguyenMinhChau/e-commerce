import {
    TOOGLE_QR_CODE,
    TOOGLE_NOTIFY,
    TOOGLE_CART_LIST,
    TOOGLE_CONFIRM,
    TOOGLE_CREATE_PRODUCT,
    SET_STATUS_STRIPE,
} from '../actions';
export const toogleQrCode = (payload) => {
    return {
        type: TOOGLE_QR_CODE,
        payload,
    };
};
export const toogleNotify = (payload) => {
    return {
        type: TOOGLE_NOTIFY,
        payload,
    };
};
export const toogleCartList = (payload) => {
    return {
        type: TOOGLE_CART_LIST,
        payload,
    };
};
export const toogleConfirm = (payload) => {
    return {
        type: TOOGLE_CONFIRM,
        payload,
    };
};
export const toogleCreateProduct = (payload) => {
    return {
        type: TOOGLE_CREATE_PRODUCT,
        payload,
    };
};
export const toogleStripeStatus = (payload) => {
    return {
        type: SET_STATUS_STRIPE,
        payload,
    };
};
