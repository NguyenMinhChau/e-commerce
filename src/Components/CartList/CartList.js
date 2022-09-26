import React from 'react';
import className from 'classnames/bind';
import styles from './CartList.module.css';
import Image from '../Image/Image';
import { Icons } from '..';
import { Link } from 'react-router-dom';
import routers from '../../Routers/routers';

const cx = className.bind(styles);

function CartList() {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className={`${cx('container')}`}>
            <h4 className={`${cx('cart-header')}`}>Sản phẩm đã thêm</h4>
            <div className={`${cx('cart-list')}`}>
                {data.map((item, index) => (
                    <div className={`${cx('cart-item')}`} key={index}>
                        <Image
                            src=''
                            alt=''
                            className={`${cx('cart-image')}`}
                        />
                        <div className={`${cx('cart-info')}`}>
                            <div className={`${cx('cart-top')}`}>
                                <h5 className={`${cx('cart-top-name')}`}>
                                    Bộ kem đặc trị vùng mắt
                                </h5>
                                <div className={`${cx('cart-info-price')}`}>
                                    <span
                                        className={`${cx(
                                            'cart-info-price-price'
                                        )}`}
                                    >
                                        16.000
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
                                        2
                                    </span>
                                </div>
                            </div>
                            <div className={`${cx('cart-bottom')}`}>
                                <span className={`${cx('cart-bottom-desc')}`}>
                                    Phân loại: Mỹ phẩm
                                </span>
                                <span className={`${cx('cart-bottom-delete')}`}>
                                    <Icons.DeleteIcon />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link to={routers.cart} className={`${cx('cart-view-btn')}`}>
                Xem giỏ hàng
            </Link>
        </div>
    );
}

export default CartList;
