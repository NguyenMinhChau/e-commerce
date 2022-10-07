import { api } from '../utils';

// GET ALL SHOPS
export const getAllShop = async (props = {}) => {
    const resGet = await api.shopGet(
        `/getall?page=${props.page}&limit=${props.limit}`,
        {
            token: props?.data?.token,
        }
    );
    props.dispatch(props.ACgetalls.getAllShop(resGet));
};
// GET SHOP BY ID
export const getShopById = async (props = {}) => {
    const resGet = await api.shopGet(`/${props.id}`, {
        token: props?.data?.token,
    });
    props.dispatch(
        props.ACgetalls.getAllData({
            ...props.state.data,
            dataById: resGet,
        })
    );
};
