import { SET_QUANTITY_PRODUCT, SET_CART_LIST } from '../actions';

export const setQuantityProduct = (payload) => {
    return {
        type: SET_QUANTITY_PRODUCT,
        payload,
    };
};

export const setCartList = (payload) => {
    return {
        type: SET_CART_LIST,
        payload,
    };
};
