import {
    SET_CURRENT_USER,
    SET_SEARCH_VALUE,
    SET_FORM_VALUE,
    SET_ERROR_MESSAGE,
    SET_SUCCESS_MESSAGE,
    SET_PAGINATION,
    TOOGLE_QR_CODE,
    TOOGLE_NOTIFY,
    TOOGLE_CART_LIST,
    TOOGLE_CONFIRM,
    TOOGLE_CREATE_PRODUCT,
    GET_ALL_USER,
} from './actions';
import { store } from '../utils';

const initialState = {
    currentUser: store.getStore(),
    toogleQrCode: false,
    toogleNotify: false,
    toogleCartList: false,
    toogleConfirm: false,
    toogleCreateProduct: false,
    search: '',
    errorMessage: '',
    successMessage: '',
    form: {
        username: '',
        email: '',
        password: '',
    },
    pagination: {
        page: 1,
        limit: 10,
    },
    data: {
        dataUser: [],
    },
};
const reducer = (state, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            };
        case TOOGLE_QR_CODE:
            return {
                ...state,
                toogleQrCode: action.payload,
            };
        case TOOGLE_NOTIFY:
            return {
                ...state,
                toogleNotify: action.payload,
            };
        case SET_SEARCH_VALUE:
            return {
                ...state,
                search: action.payload,
            };
        case TOOGLE_CART_LIST:
            return {
                ...state,
                toogleCartList: action.payload,
            };
        case TOOGLE_CREATE_PRODUCT:
            return {
                ...state,
                toogleCreateProduct: action.payload,
            };
        case SET_FORM_VALUE:
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.payload,
                },
            };
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload,
            };
        case SET_SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: action.payload,
            };
        case TOOGLE_CONFIRM:
            return {
                ...state,
                toogleConfirm: action.payload,
            };
        case GET_ALL_USER:
            return {
                ...state,
                data: {
                    ...state.data,
                    dataUser: action.payload,
                },
            };
        case SET_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};
export { initialState };
export default reducer;
