import { SET_ERROR_MESSAGE, SET_SUCCESS_MESSAGE } from '../actions';

export const setError = (payload) => {
    return {
        type: SET_ERROR_MESSAGE,
        payload,
    };
};
export const setSuccess = (payload) => {
    return {
        type: SET_SUCCESS_MESSAGE,
        payload,
    };
};
