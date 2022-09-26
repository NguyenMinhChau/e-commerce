export const lowercase = (str) => {
    return str.toLowerCase();
};
export const uppercase = (str) => {
    return str.toUpperCase();
};
export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
