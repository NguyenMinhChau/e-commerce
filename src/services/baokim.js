import { api } from '../utils';

export const checkoutBaoKim = async (props = {}) => {
    const resPost = await api.baokimPost('/checkout', {});
    console.log(resPost);
};
