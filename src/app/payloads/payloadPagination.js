import { SET_PAGINATION } from '../actions';
export const setPagination = (payload) => {
    return {
        type: SET_PAGINATION,
        payload,
    };
};
