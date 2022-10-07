import { SET_FORM_VALUE, SET_FORM_CREATE_PRODUCT } from '../actions';
export const setFormValue = (payload) => {
    return {
        type: SET_FORM_VALUE,
        payload,
    };
};

export const setFormCreateProduct = (payload) => {
    return {
        type: SET_FORM_CREATE_PRODUCT,
        payload,
    };
};
