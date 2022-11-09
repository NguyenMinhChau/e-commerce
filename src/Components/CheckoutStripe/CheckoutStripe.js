/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React from 'react';
import className from 'classnames/bind';
import { requestRefreshToken, useAppContext } from '../../utils/';
import { products, stripes } from '../../services';
import { ACusers } from '../../app/';
import styles from './CheckoutStripe.module.css';

const cx = className.bind(styles);

function CheckoutStripe({ dataCartList }) {
    const { state, dispatch } = useAppContext();
    const { currentUser } = state;
    const inventorySold = dataCartList.map((item) => {
        return {
            id: item?._id || item?.id,
            inventory: parseInt(item?.inventory) - parseInt(item?.quantity),
            sold: parseInt(item?.sold) + parseInt(item?.quantity),
        };
    });
    const updateInventoryAPI = (data, id) => {
        inventorySold.map((item) => {
            products.updateProductInventory({
                token: data?.token,
                inventory: parseInt(item?.inventory),
                sold: parseInt(item?.sold),
                id: id,
            });
        });
    };
    const handleUpdateInventory = async (id) => {
        try {
            await 1;
            requestRefreshToken(
                currentUser,
                updateInventoryAPI,
                state,
                dispatch,
                ACusers,
                id
            );
        } catch (err) {
            console.log(err);
        }
    };
    const handleCheckout = () => {
        stripes.checkoutStripe({
            dataCartList,
            currentUser,
        });
        // inventorySold.forEach(async (item) => {
        //     await handleUpdateInventory(item.id);
        // });
    };
    return (
        <div className={`${cx('button-stripe-container')}`}>
            <button
                className={`${cx('button-stripe')}`}
                onClick={handleCheckout}
            >
                <img src='/images/stripe.png' alt='' />
            </button>
        </div>
    );
}

export default CheckoutStripe;
