import React from 'react';
import className from 'classnames/bind';
import { useAppContext } from '../../utils/';
import { stripes } from '../../services';
import styles from './CheckoutStripe.module.css';

const cx = className.bind(styles);

function CheckoutStripe({ dataCartList }) {
    const { state } = useAppContext();
    const { currentUser } = state;
    const handleCheckout = () => {
        stripes.checkoutStripe({
            dataCartList,
            currentUser,
        });
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
