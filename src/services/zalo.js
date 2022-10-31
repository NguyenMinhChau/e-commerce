import { api } from '../utils';

// CHECKOUT ZALO
export const checkoutZalo = async (props = {}) => {
    try {
        const itemData = props.dataCartList.reduce((acc, item) => {
            acc.push({
                itemid: item.id,
                itename: item.name,
                itemquantity: item.quantity,
                itemprice: item.price,
            });
            return acc;
        }, []);
        await api.zaloPost('/checkout', {
            itemData: itemData,
            emailUser: props?.currentUser?.email,
        });
    } catch (err) {
        console.log(err.message);
    }
};
