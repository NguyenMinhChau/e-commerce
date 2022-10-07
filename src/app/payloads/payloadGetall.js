import {
    GET_ALL_USER,
    GET_ALL_PRODUCT,
    GET_ALL_SHOP,
    GET_ALL_FEEDBACK,
} from '../actions';

export const getAllUser = (payload) => {
    return {
        type: GET_ALL_USER,
        payload,
    };
};
export const getAllProduct = (payload) => {
    return {
        type: GET_ALL_PRODUCT,
        payload,
    };
};
export const getAllShop = (payload) => {
    return {
        type: GET_ALL_SHOP,
        payload,
    };
};
export const getAllFeedback = (payload) => {
    return {
        type: GET_ALL_FEEDBACK,
        payload,
    };
};
