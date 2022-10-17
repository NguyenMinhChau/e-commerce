import { SET_SEARCH_VALUE, SET_HISTORY_SEARCH } from '../actions';
export const setSearchValue = (payload) => {
    return {
        type: SET_SEARCH_VALUE,
        payload,
    };
};
export const setSearchHistory = (payload) => {
    return {
        type: SET_HISTORY_SEARCH,
        payload,
    };
};
