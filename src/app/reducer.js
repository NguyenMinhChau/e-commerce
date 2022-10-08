import {
    SET_CURRENT_USER,
    SET_SEARCH_VALUE,
    SET_FORM_VALUE,
    SET_ERROR_MESSAGE,
    SET_SUCCESS_MESSAGE,
    SET_PAGINATION,
    SET_SINGLE_FILE_UPLOAD,
    SET_MULTIPLE_FILE_UPLOAD,
    SET_FORM_CREATE_PRODUCT,
    SET_QUANTITY_PRODUCT,
    SET_CART_LIST,
    TOOGLE_QR_CODE,
    TOOGLE_NOTIFY,
    TOOGLE_CART_LIST,
    TOOGLE_CONFIRM,
    TOOGLE_CREATE_PRODUCT,
    GET_ALL_USER,
    GET_ALL_PRODUCT,
    GET_ALL_SHOP,
    GET_ALL_FEEDBACK,
    GET_FEEDBACK_BY_PRODUCT_ID,
    GET_A_PRODUCT,
} from './actions';
import { store } from '../utils';

const initialState = {
    currentUser: store.getStore(),
    toogleQrCode: false,
    toogleNotify: false,
    toogleCartList: false,
    toogleConfirm: false,
    singleFile: null,
    multipleFile: null,
    toogleCreateProduct: false,
    search: '',
    errorMessage: '',
    successMessage: '',
    quantityProduct: 1,
    form: {
        username: '',
        email: '',
        password: '',
    },
    formCreateProduct: {
        name: '',
        price: '',
        description: '',
        reducedPrice: '',
        category: '',
        brand: '',
        percentReduced: '',
        rating: '',
        inventory: '',
        priceImport: '',
        dateImport: new Date().toISOString(),
        shop: '',
    },
    pagination: {
        page: 1,
        limit: 10,
    },
    data: {
        dataProducts: [],
        dataShops: [],
        dataUsers: [],
        dataFeedBacks: [],
        dataFeedBacksByIdProduct: [],
        dataCartList: [],
        dataById: null,
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
        case SET_CART_LIST:
            return {
                ...state,
                data: {
                    ...state.data,
                    dataCartList: action.payload,
                },
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
        case SET_FORM_CREATE_PRODUCT:
            return {
                ...state,
                formCreateProduct: {
                    ...state.formCreateProduct,
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
        case SET_SINGLE_FILE_UPLOAD:
            return {
                ...state,
                singleFile: action.payload,
            };
        case SET_MULTIPLE_FILE_UPLOAD:
            return {
                ...state,
                multipleFile: action.payload,
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
                    dataUsers: action.payload,
                },
            };
        case GET_ALL_PRODUCT:
            return {
                ...state,
                data: {
                    ...state.data,
                    dataProducts: action.payload,
                },
            };
        case GET_ALL_SHOP:
            return {
                ...state,
                data: {
                    ...state.data,
                    dataShops: action.payload,
                },
            };
        case GET_ALL_FEEDBACK:
            return {
                ...state,
                data: {
                    ...state.data,
                    dataFeedBacks: action.payload,
                },
            };
        case GET_FEEDBACK_BY_PRODUCT_ID:
            return {
                ...state,
                data: {
                    ...state.data,
                    dataFeedBacksByIdProduct: action.payload,
                },
            };
        case GET_A_PRODUCT:
            return {
                ...state,
                data: {
                    ...state.data,
                    dataById: action.payload,
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
        case SET_QUANTITY_PRODUCT:
            return {
                ...state,
                quantityProduct: action.payload,
            };
        default:
            return state;
    }
};
export { initialState };
export default reducer;
