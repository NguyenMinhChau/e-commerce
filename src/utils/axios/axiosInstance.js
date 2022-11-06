import axios from 'axios';

// Authentication
const authenInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/authen/`,
    withCredentials: true,
});
export const authenPost = async (path, options = {}) => {
    const res = await authenInstance.post(path, options);
    return res.data;
};
export const refreshToken = async (path, options = {}) => {
    const res = await authenInstance.post(path, options);
    return res.data;
};
// User
const userInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/users/`,
    // withCredentials: true,
});
export const userGet = async (path, options = {}) => {
    const res = await userInstance.get(path, options);
    return res.data;
};
export const userPost = async (path, options = {}) => {
    const res = await userInstance.post(path, options);
    return res.data;
};
export const userPut = async (path, options = {}) => {
    const res = await userInstance.put(path, options);
    return res.data;
};
export const userDelete = async (path, options = {}, others = {}) => {
    const res = await userInstance.delete(path, options, others);
    return res.data;
};
// PRODUCT
const productInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/product/`,
    // withCredentials: true,
});
export const productGet = async (path, options = {}) => {
    const res = await productInstance.get(path, options);
    return res.data;
};
export const productPost = async (path, options = {}, others = {}) => {
    const res = await productInstance.post(path, options, others);
    return res.data;
};
export const productPut = async (path, options = {}, others = {}) => {
    const res = await productInstance.put(path, options, others);
    return res.data;
};
export const productDelete = async (path, options = {}, others = {}) => {
    const res = await productInstance.delete(path, options, others);
    return res.data;
};
// SHOP
const shopInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/shop/`,
    // withCredentials: true,
});
export const shopGet = async (path, options = {}) => {
    const res = await shopInstance.get(path, options);
    return res.data;
};
export const shopPost = async (path, options = {}) => {
    const res = await shopInstance.post(path, options);
    return res.data;
};
export const shopPut = async (path, options = {}) => {
    const res = await shopInstance.put(path, options);
    return res.data;
};
export const shopDelete = async (path, options = {}) => {
    const res = await shopInstance.delete(path, options);
    return res.data;
};
// FEEDBACK
const feedbackInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/feedback/`,
    // withCredentials: true,
});
export const feedbackGet = async (path, options = {}, others = {}) => {
    const res = await feedbackInstance.get(path, options, others);
    return res.data;
};
export const feedbackPost = async (path, options = {}, others = {}) => {
    const res = await feedbackInstance.post(path, options, others);
    return res.data;
};
export const feedbackPut = async (path, options = {}) => {
    const res = await feedbackInstance.put(path, options);
    return res.data;
};
export const feedbackDelete = async (path, options = {}) => {
    const res = await feedbackInstance.delete(path, options);
    return res.data;
};
// STRIPE
const stripeInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/stripe/`,
    // withCredentials: true,
});
export const stripePost = async (path, options = {}) => {
    const res = await stripeInstance.post(path, options);
    return res.data;
};
// EMAIL
const emailInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/email/`,
    // withCredentials: false,
});
export const emailPost = async (path, options = {}, others = {}) => {
    const res = await emailInstance.post(path, options, others);
    return res.data;
};
// ZALO
const zaloInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/zalo/`,
    // withCredentials: true,
});
export const zaloPost = async (path, options = {}, others = {}) => {
    const res = await zaloInstance.post(path, options, others);
    return res.data;
};
// VNPAY
const vnpayInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/vnpay/`,
    // withCredentials: true,
});
export const vnpayPost = async (path, options = {}, others = {}) => {
    const res = await vnpayInstance.post(path, options, others);
    return res.data;
};
// VNPAY
const baokimInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/baokim/`,
    withCredentials: true,
});
export const baokimPost = async (path, options = {}, others = {}) => {
    const res = await baokimInstance.post(path, options, others);
    return res.data;
};
// LIVE
const liveInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/live/`,
    // withCredentials: true,
});
export const livePost = async (path, options = {}, others = {}) => {
    const res = await liveInstance.post(path, options, others);
    return res.data;
};
export const liveGet = async (path, options = {}, others = {}) => {
    const res = await liveInstance.get(path, options, others);
    return res.data;
};
export const liveDelete = async (path, options = {}, others = {}) => {
    const res = await liveInstance.delete(path, options, others);
    return res.data;
};
