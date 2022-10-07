import React from 'react';
import className from 'classnames/bind';
import styles from './CartList.module.css';
import Image from '../Image/Image';
import { Icons } from '..';
import { Link } from 'react-router-dom';
import routers from '../../Routers/routers';
import { moneys, useAppContext } from '../../utils';

const cx = className.bind(styles);

function CartList({ data }) {
    const { state } = useAppContext();
    const {
        data: { dataCartList },
    } = state;
    const deleteAction = (id) => {
        dataCartList.splice(id, 1);
    };
    return (
        <div className={`${cx('container')}`}>
            <h4 className={`${cx('cart-header')}`}>Sản phẩm đã thêm</h4>
            <div className={`${cx('cart-list')}`}>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div className={`${cx('cart-item')}`} key={index}>
                            <Image
                                src={`http://localhost:8000/${item?.thumbnail}`}
                                alt={item?.name}
                                className={`${cx('cart-image')}`}
                            />
                            <div className={`${cx('cart-info')}`}>
                                <div className={`${cx('cart-top')}`}>
                                    <h5 className={`${cx('cart-top-name')}`}>
                                        {item?.name}
                                    </h5>
                                    <div className={`${cx('cart-info-price')}`}>
                                        <span
                                            className={`${cx(
                                                'cart-info-price-price'
                                            )}`}
                                        >
                                            {moneys.VND(item?.price)}
                                        </span>
                                        <span
                                            className={`${cx(
                                                'cart-info-price-multiply'
                                            )}`}
                                        >
                                            x
                                        </span>
                                        <span
                                            className={`${cx(
                                                'cart-info-price-quantity'
                                            )}`}
                                        >
                                            {item?.quantity}
                                        </span>
                                    </div>
                                </div>
                                <div className={`${cx('cart-bottom')}`}>
                                    <span
                                        className={`${cx('cart-bottom-desc')}`}
                                    >
                                        Phân loại: {item?.brand}
                                    </span>
                                    <span
                                        className={`${cx(
                                            'cart-bottom-delete'
                                        )}`}
                                        onClick={() => deleteAction(index)}
                                    >
                                        <Icons.DeleteIcon />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <Image
                        src=''
                        alt='No product'
                        className={`${cx('image')}`}
                    />
                )}
            </div>
            <Link to={routers.cart} className={`${cx('cart-view-btn')}`}>
                Xem giỏ hàng
            </Link>
        </div>
    );
}

export default CartList;
