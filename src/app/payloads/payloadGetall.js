import { GET_ALL_USER } from '../actions';

export const getalluser = (payload) => {
    return {
        type: GET_ALL_USER,
        payload,
    };
};
