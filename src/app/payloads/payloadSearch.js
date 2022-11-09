import {
    SET_SEARCH_VALUE,
    SET_HISTORY_SEARCH,
    SET_MIN_PRICE_VALUE,
    SET_MAX_PRICE_VALUE,
} from '../actions';
export const setSearchValue = (payload) => {
    return {
        type: SET_SEARCH_VALUE,
        payload,
    };
};
export const setMinPriceValue = (payload) => {
    return {
        type: SET_MIN_PRICE_VALUE,
        payload,
    };
};
export const setMaxPriceValue = (payload) => {
    return {
        type: SET_MAX_PRICE_VALUE,
        payload,
    };
};
export const setSearchHistory = (payload) => {
    return {
        type: SET_HISTORY_SEARCH,
        payload,
    };
};
