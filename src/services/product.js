/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { api } from '../utils';

// GET ALL PRODUCTS
export const getAllProduct = async (props = {}) => {
    const resGet = await api.productGet(
        props.page && !props.category
            ? `/getall?page=${props.page}&limit=${props.limit}`
            : props.category && props.page
            ? `/getall?page=${props.page}&limit=${props.limit}&category=${props.category}`
            : '/getall'
    );
    props.dispatch(props.ACgetalls.getAllProduct(resGet));
};
// GET PRODUCT BY ID
// export const getByIdProduct = async (props = {}) => {
//     const resGet = await api.productGet(`/${props.id}`, {
//         token: props?.data?.token,
//     });
//     props.dispatch(props.ACgetones.getAProduct(resGet));
// };
// GET PRODUCT BY SLUG
export const getBySlugProduct = async (props = {}) => {
    const resGet = await api.productGet(`/${props.slug}`, {
        token: props?.data?.token,
    });
    props.dispatch(props.ACgetones.getAProduct(resGet));
};
// CREATE PRODUCT
export const createProduct = async (props = {}) => {
    const resPost = await api.productPost(
        '/add',
        {
            name: props.name,
            price: props.price,
            description: props.description,
            reducedPrice: props.reducedPrice,
            category: props.category,
            brand: props.brand,
            percentReduced: props.percentReduced,
            rating: props.rating,
            inventory: props.inventory,
            priceImport: props.priceImport,
            dateImport: props.dateImport,
            shop: props.shop,
            thumbnail: props.thumbnail[0],
            imagesList: props.imagesList[0],
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                token: props?.data?.token,
            },
        }
    );
    window.location.reload();
};
// UPDATE PRODUCT
export const updateProduct = async (props = {}) => {
    const { multipleFile, singleFile, ...dataResPut } = props;
    const resPut = await api.productPut(
        `/${props.id}`,
        {
            ...dataResPut,
            description: props.description,
            thumbnail: props.singleFile[0],
            imagesList: props.multipleFile[0],
            inventory: props.inventory,
            sold: props.sold,
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                token: props?.token,
            },
        }
    );
    window.location.reload();
};
// UPDATE PRODUCT
export const updateProductInventory = async (props = {}) => {
    const resPut = await api.productPut(
        `/${props.id}`,
        {
            inventory: props.inventory,
            sold: props.sold,
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                token: props?.token,
            },
        }
    );
    window.location.reload();
};
// DELETE PRODUCT
export const deleteProduct = async (props = {}) => {
    const resDel = await api.productDelete(`/${props.id}`, {
        token: props?.token,
        headers: {
            token: props?.token,
        },
    });
    window.location.reload();
};
export const SVfindPrice = async (props = {}) => {
    const resGet = await api.productGet(
        props.category
            ? `/findPrice?page=${props.page}&limit=${props.limit}&minPrice=${props.minPrice}&maxPrice=${props.maxPrice}&category=${props.category}`
            : `/findPrice?page=${props.page}&limit=${props.limit}&minPrice=${props.minPrice}&maxPrice=${props.maxPrice}`
    );
    console.log(resGet);
    props.dispatch(props.ACgetalls.getAllProduct(resGet));
};
