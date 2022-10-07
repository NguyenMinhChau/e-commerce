import { SET_SINGLE_FILE_UPLOAD, SET_MULTIPLE_FILE_UPLOAD } from '../actions';

export const setSingleFile = (payload) => {
    return {
        type: SET_SINGLE_FILE_UPLOAD,
        payload,
    };
};
export const setMultipleFile = (payload) => {
    return {
        type: SET_MULTIPLE_FILE_UPLOAD,
        payload,
    };
};
