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
    withCredentials: true,
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
    withCredentials: true,
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
    withCredentials: true,
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
    withCredentials: true,
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
    withCredentials: true,
});
export const stripePost = async (path, options = {}) => {
    const res = await stripeInstance.post(path, options);
    return res.data;
};
