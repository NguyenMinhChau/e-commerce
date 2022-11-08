import {
    GET_ALL_USER,
    GET_ALL_PRODUCT,
    GET_ALL_SHOP,
    GET_ALL_FEEDBACK,
    GET_ALL_LIVE,
    GET_ALL_TKDOANHTHU,
    GET_FEEDBACK_BY_PRODUCT_ID,
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
export const getAllLive = (payload) => {
    return {
        type: GET_ALL_LIVE,
        payload,
    };
};
export const getFeedbackByIdProduct = (payload) => {
    return {
        type: GET_FEEDBACK_BY_PRODUCT_ID,
        payload,
    };
};
export const getDoanhThu = (payload) => {
    return {
        type: GET_ALL_TKDOANHTHU,
        payload,
    };
};
