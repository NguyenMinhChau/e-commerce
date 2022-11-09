/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React from 'react';
import className from 'classnames/bind';
import styles from './CheckoutHome.module.css';
import { api, requestRefreshToken, useAppContext } from '../../utils';
import { ACusers } from '../../app/';
import { products } from '../../services';

const cx = className.bind(styles);

function CheckoutHome({ dataCartList }) {
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
    const handleCheckout = (e) => {
        e.preventDefault();
        inventorySold.forEach(async (item) => {
            await handleUpdateInventory(item.id);
        });
        api.checkoutHomePost('/sendEmail', {
            user: currentUser,
            dataCart: dataCartList,
        });
    };
    return (
        <div className={`${cx('button-home-container')}`}>
            <button className={`${cx('button-home')}`} onClick={handleCheckout}>
                <img src='/images/home.png' alt='' />
            </button>
        </div>
    );
}

export default CheckoutHome;
