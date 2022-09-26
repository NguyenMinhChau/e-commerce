/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import className from 'classnames/bind';
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
import { useAppContext } from '../../utils';
import { Icons, RoleAdmin } from '../../Components';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import routers from '../../Routers/routers';

const cx = className.bind(styles);

function Home() {
    const { state } = useAppContext();
    const { currentUser } = state;
    const [heart, setHeart] = useState(false);
    const [rating, setRating] = useState(2.5);
    const [page, setPage] = useState(1);
    const handleHeart = () => {
        setHeart(!heart);
    };
    const handleRating = (e, value) => {
        setRating(value);
    };
    const handlePage = (e, value) => {
        setPage(value);
    };
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className={`${cx('container')}`}>
            {currentUser.role === 'admin' && <RoleAdmin />}
            <div className={`${cx('products-list')}`}>
                {data.map((item, index) => (
                    <div className={`${cx('products-item')}`} key={index}>
                        <div className={`${cx('item-container')}`}>
                            <div
                                className={`${cx('item-image')}`}
                                style={{
                                    backgroundImage:
                                        'url(https://cf.shopee.vn/file/a6d210137557070a7296e8054dbc7ca6_tn)',
                                }}
                            ></div>
                            <Link
                                to={`${routers.products}/${routers.productDetail}/${item}`}
                                className={`${cx('item-title')}`}
                                title=''
                            >
                                Tai Nghe Bluetooth Không Dây inpods i12 TWS | Vỏ
                                ốp lưng Case Airpods 1/2 - Awifi Case
                            </Link>
                            <div className={`${cx('item-price-container')}`}>
                                <span className={`${cx('item-price-old')}`}>
                                    1.200.000đ
                                </span>
                                <span className={`${cx('item-price-current')}`}>
                                    999.000đ
                                </span>
                            </div>
                            <div className={`${cx('item-actions-container')}`}>
                                <span
                                    className={`${cx('item-actions-likes')}`}
                                    onClick={() => handleHeart()}
                                >
                                    {!heart ? (
                                        <Icons.HeartEmptyIcon />
                                    ) : (
                                        <Icons.HeartFillIcons />
                                    )}
                                </span>
                                <div className={`${cx('item-actions-rating')}`}>
                                    <Rating
                                        name='half-rating'
                                        value={rating}
                                        precision={0.5}
                                        onChange={handleRating}
                                    />
                                </div>
                                <span className={`${cx('item-sold')}`}>
                                    Đã bán 77
                                </span>
                            </div>
                            <div className={`${cx('item-origin-container')}`}>
                                <span className={`${cx('item-origin-brand')}`}>
                                    Shop
                                </span>
                                <span className={`${cx('item-origin-name')}`}>
                                    Tp.Hồ Chí Minh
                                </span>
                            </div>
                            <div
                                className={`${cx('item-favourite-container')}`}
                            >
                                <Icons.CheckIcon
                                    className={`${cx('icon-check')}`}
                                />
                                <span>Yêu thích</span>
                            </div>
                            <div className={`${cx('item-saleoff-container')}`}>
                                <span className={`${cx('sale-off-percent')}`}>
                                    10%
                                </span>
                                <span className={`${cx('sale-off-label')}`}>
                                    GIẢM
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`${cx('item-pagination-container')}`}>
                <Pagination
                    count={10}
                    variant='outlined'
                    shape='rounded'
                    onChange={handlePage}
                    showFirstButton
                    showLastButton
                />
            </div>
        </div>
    );
}

export default Home;
