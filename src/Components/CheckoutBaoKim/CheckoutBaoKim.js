import React from 'react';
import className from 'classnames/bind';
// import { useAppContext } from '../../utils';
import { baokims } from '../../services';
import styles from './CheckoutBaoKim.module.css';

const cx = className.bind(styles);

function CheckoutBaoKim({ dataCartList }) {
    // const { state } = useAppContext();
    // const { currentUser } = state;
    const handleCheckout = () => {
        baokims.checkoutBaoKim({});
    };
    return (
        <div className={`${cx('button-baokim-container')}`}>
            <button
                className={`${cx('button-baokim')}`}
                onClick={handleCheckout}
            >
                <img src='/images/baokim.png' alt='' />
            </button>
        </div>
    );
}

export default CheckoutBaoKim;
