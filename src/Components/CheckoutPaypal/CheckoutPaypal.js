/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { requestRefreshToken, useAppContext } from '../../utils';
import { ACusers } from '../../app/';
import { products } from '../../services';
import { setCartList } from '../../app/payloads/payloadCart';
import className from 'classnames/bind';
import styles from './CheckoutPaypal.module.css';
import routers from '../../Routers/routers';

const cx = className.bind(styles);

function CheckoutPaypal({ dataCartList, label }) {
    const { state, dispatch } = useAppContext();
    const { currentUser } = state;
    const [paidFor, setPaidFor] = useState();
    const [error, setError] = useState(null);
    const history = useNavigate();
    const handleApprove = (orderId) => {
        setPaidFor(true);
    };
    const totalBills = () => {
        return dataCartList.reduce((total, item) => {
            return total + item?.price * item?.quantity;
        }, 0);
    };
    const inventorySold = dataCartList.map((item) => {
        return {
            id: item?._id || item?.id,
            inventory: parseInt(item?.inventory) - parseInt(item?.quantity),
            sold: parseInt(item?.sold) + parseInt(item?.quantity),
        };
    });
    const updateInventoryAPI = (data, id) => {
        inventorySold.map((item) => {
            products.updateProduct({
                token: data?.token,
                inventory: item?.inventory,
                sold: item?.sold,
                id: item?.id,
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
    if (paidFor) {
        inventorySold.forEach(async (item) => {
            await handleUpdateInventory(item.id);
        });
        dispatch(setCartList([]));
        return (
            <div className={`${cx('container')}`}>
                <div className={`${cx('top')} d-flex`}>
                    <div className={`${cx('title')} ml8 complete`}>
                        <h1>Thanh toán thành công</h1>
                    </div>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className={`${cx('container')}`}>
                <div className={`${cx('top')} d-flex`}>
                    <div className={`${cx('title')} ml8 cancel`}>
                        <h1>Thanh toán thất bại</h1>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <PayPalButtons
            style={{
                color: 'silver',
                shape: 'pill',
                layout: 'horizontal',
                tagline: false,
                height: 40,
                label: label ? label : '',
            }}
            onClick={(data, actions) => {
                if (!currentUser) {
                    history(routers.login);
                } else {
                    let hasAlreadyBoughtCourse = false;
                    if (hasAlreadyBoughtCourse) {
                        setError('Bạn đã mua khóa học này rồi');
                        return actions.reject();
                    } else {
                        return actions.resolve();
                    }
                }
            }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: 'Thanh toán giỏ hàng',
                            amount: {
                                currency_code: 'USD',
                                value: parseInt(totalBills() / 23000),
                            },
                        },
                    ],
                });
            }}
            onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
                handleApprove(data.orderID);
            }}
            onCancel={() => {}}
            onError={(err) => {
                setError(err);
                console.log('Paypal checkout onError: ', err);
            }}
        />
    );
}

export default CheckoutPaypal;
