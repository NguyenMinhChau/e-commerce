/* eslint-disable no-unused-vars */
import React from 'react';
import className from 'classnames/bind';
import { requestRefreshToken, useAppContext } from '../../utils';
import { products, zalos } from '../../services';
import { ACusers } from '../../app/';
import styles from './CheckoutZalo.module.css';

const cx = className.bind(styles);

function CheckoutZalo({ dataCartList }) {
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
        // inventorySold.forEach(async (item) => {
        //     await handleUpdateInventory(item.id);
        // });
        zalos.checkoutZalo({
            dataCartList,
            currentUser,
        });
    };
    return (
        <div className={`${cx('button-zalo-container')}`}>
            <button className={`${cx('button-zalo')}`} onClick={handleCheckout}>
                <img src='/images/zalo.png' alt='' />
            </button>
        </div>
    );
}

export default CheckoutZalo;
