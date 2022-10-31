import React from 'react';
import className from 'classnames/bind';
// import { useAppContext } from '../../utils';
import { vnpays } from '../../services';
import styles from './CheckoutVnpay.module.css';

const cx = className.bind(styles);

function CheckoutVnpay({ dataCartList }) {
    // const { state } = useAppContext();
    // const { currentUser } = state;
    const handleCheckout = () => {
        vnpays.checkoutVnpay({});
    };
    return (
        <div className={`${cx('button-vnpay-container')}`}>
            <button
                className={`${cx('button-vnpay')}`}
                onClick={handleCheckout}
            >
                <img src='/images/vnpay.png' alt='' />
            </button>
        </div>
    );
}

export default CheckoutVnpay;
