import { SET_CURRENT_USER } from '../actions';
export const setCurrentUser = (payload) => {
    return {
        type: SET_CURRENT_USER,
        payload,
    };
};
