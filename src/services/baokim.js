/* eslint-disable no-unused-vars */
import { api } from '../utils';

export const checkoutBaoKim = async (props = {}) => {
    const resPost = await api.baokimPost('/checkout', {});
};
