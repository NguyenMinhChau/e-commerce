/* eslint-disable array-callback-return */
export const findAdressShop = (data, id) => {
    const result = data.map((item) => {
        if (item._id === id) {
            return item.address;
        }
    });
    return result.filter((x) => x)[0];
};
