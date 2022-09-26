import { SET_FORM_VALUE } from '../actions';
export const setFormValue = (payload) => {
    return {
        type: SET_FORM_VALUE,
        payload,
    };
};
