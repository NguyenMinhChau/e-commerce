import React from 'react';
import className from 'classnames/bind';
import { useAppContext } from '../../utils';
import { zalos } from '../../services';
import styles from './CheckoutZalo.module.css';

const cx = className.bind(styles);

function CheckoutZalo({ dataCartList }) {
    const { state } = useAppContext();
    const { currentUser } = state;
    const handleCheckout = () => {
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
