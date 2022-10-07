/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
import { useAppContext, moneys, percents, findsAdr } from '../../utils';
import { Icons, RoleAdmin } from '../../Components';
import { products, shops } from '../../services';
import { ACgetalls } from '../../app/';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import routers from '../../Routers/routers';

const cx = className.bind(styles);

function Home() {
    const { state, dispatch } = useAppContext();
    const {
        currentUser,
        pagination: { page, limit },
        data: { dataProducts },
    } = state;
    const [heart, setHeart] = useState(false);
    const [rating, setRating] = useState(2.5);
    useEffect(() => {
        products.getAllProduct({
            data: currentUser,
            page,
            limit,
            ACgetalls,
            state,
            dispatch,
        });
    }, []);
    const handleHeart = () => {
        setHeart(!heart);
    };
    const handleRating = (e, value) => {
        setRating(value);
    };
    const data = dataProducts.products || [];

    return (
        <div className={`${cx('container')}`}>
            {currentUser.role === 'admin' && <RoleAdmin />}
            <div className={`${cx('products-list')}`}>
                {data.map((item, index) => {
                    return (
                        <div className={`${cx('products-item')}`} key={index}>
                            <div className={`${cx('item-container')}`}>
                                <div
                                    className={`${cx('item-image')}`}
                                    style={{
                                        backgroundImage: `url(http://localhost:8000${item.thumbnail})`,
                                    }}
                                ></div>
                                <Link
                                    to={`${routers.products}/${routers.productDetail}/${item.slug}`}
                                    className={`${cx('item-title')}`}
                                    title={item.description}
                                >
                                    {item.description}
                                </Link>
                                <div
                                    className={`${cx(
                                        'item-price-container'
                                    )} flex-center`}
                                >
                                    <span
                                        className={`${cx(
                                            'item-price-old'
                                        )} mb8`}
                                    >
                                        {moneys.VND(item.price)}
                                    </span>
                                    <span
                                        className={`${cx(
                                            'item-price-current'
                                        )} mb8`}
                                    >
                                        {moneys.VND(item.reducedPrice)}
                                    </span>
                                </div>
                                <div
                                    className={`${cx(
                                        'item-actions-container'
                                    )}`}
                                >
                                    <span
                                        className={`${cx(
                                            'item-actions-likes'
                                        )}`}
                                        onClick={() => handleHeart()}
                                    >
                                        {!item.likesStatus ? (
                                            <Icons.HeartEmptyIcon />
                                        ) : (
                                            <Icons.HeartFillIcons />
                                        )}
                                    </span>
                                    <div
                                        className={`${cx(
                                            'item-actions-rating'
                                        )}`}
                                    >
                                        <Rating
                                            name='half-rating'
                                            value={parseFloat(item.rating)}
                                            precision={0.5}
                                            readOnly
                                            onChange={handleRating}
                                        />
                                    </div>
                                    <span className={`${cx('item-sold')}`}>
                                        Đã bán {item.sold}
                                    </span>
                                </div>
                                <div
                                    className={`${cx('item-origin-container')}`}
                                >
                                    <span
                                        className={`${cx('item-origin-brand')}`}
                                    >
                                        Địa chỉ
                                    </span>
                                    <span
                                        className={`${cx('item-origin-name')}`}
                                    >
                                        {item?.shop[0].address}
                                    </span>
                                </div>
                                <div
                                    className={`${cx(
                                        'item-favourite-container'
                                    )}`}
                                >
                                    <Icons.CheckIcon
                                        className={`${cx('icon-check')}`}
                                    />
                                    <span>Yêu thích</span>
                                </div>
                                {item.percentReduced && (
                                    <div
                                        className={`${cx(
                                            'item-saleoff-container'
                                        )}`}
                                    >
                                        <span
                                            className={`${cx(
                                                'sale-off-percent'
                                            )}`}
                                        >
                                            {percents.convertPerson(
                                                item.percentReduced
                                            )}
                                        </span>
                                        <span
                                            className={`${cx(
                                                'sale-off-label'
                                            )}`}
                                        >
                                            GIẢM
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={`${cx('item-pagination-container')}`}>
                <Pagination
                    count={Math.ceil(dataProducts.total / limit)}
                    variant='outlined'
                    shape='rounded'
                    // onChange={handlePage}
                    showFirstButton
                    showLastButton
                />
            </div>
        </div>
    );
}

export default Home;