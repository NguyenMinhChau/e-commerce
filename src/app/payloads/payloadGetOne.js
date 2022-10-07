import { GET_A_PRODUCT } from '../actions';

export const getAProduct = (payload) => {
    return {
        type: GET_A_PRODUCT,
        payload,
    };
};
