const LOGIN_DATA = 'LOGIN_DATA';

export const getStore = () => {
    return JSON.parse(localStorage.getItem(LOGIN_DATA));
};
export const setStore = (data) => {
    localStorage.setItem(LOGIN_DATA, JSON.stringify(data));
};
export const removeStore = () => {
    localStorage.removeItem(LOGIN_DATA);
};
