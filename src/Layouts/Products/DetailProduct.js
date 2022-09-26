import React from 'react';
import className from 'classnames/bind';
import Rating from '@mui/material/Rating';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Icons, Image } from '../../Components';
import styles from './DetailProducts.module.css';

const cx = className.bind(styles);

function DetailProduct() {
    return (
        <div className={`${cx('detail-container')}`}>
            <div className={`${cx('detail-left-container')}`}>
                <div
                    className={`${cx('image-lagre-container')}`}
                    style={{ backgroundImage: `url('/images/sp1.png')` }}
                ></div>
                <div className={`${cx('image-list-container')}`}>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={5}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination, Navigation]}
                        style={{
                            width: '425px',
                            height: '120px',
                        }}
                    >
                        <SwiperSlide>
                            <div
                                className={`${cx('image-small', 'active')}`}
                                style={{
                                    backgroundImage: `url('/images/sp1.png')`,
                                }}
                            ></div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                className={`${cx('image-small')}`}
                                style={{
                                    backgroundImage: `url('/images/sp2.png')`,
                                }}
                            ></div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                className={`${cx('image-small')}`}
                                style={{
                                    backgroundImage: `url('/images/sp3.png')`,
                                }}
                            ></div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                className={`${cx('image-small')}`}
                                style={{
                                    backgroundImage: `url('/images/sp4.png')`,
                                }}
                            ></div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                className={`${cx('image-small')}`}
                                style={{
                                    backgroundImage: `url('/images/sp5.png')`,
                                }}
                            ></div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className={`${cx('actions-container')}`}>
                    <div className={`${cx('action-share')}`}>
                        <div className={`${cx('action-text')}`}>Chia sẻ: </div>
                        <div className={`${cx('actions-icons')}`}>
                            <button className={`${cx('actions-btn')}`}>
                                <Icons.MessengerIcon className='messenger' />
                            </button>
                            <button className={`${cx('actions-btn')}`}>
                                <Icons.FacebookIcon className='facebook' />
                            </button>
                            <button className={`${cx('actions-btn')}`}>
                                <Icons.PinterestIcon className='pinterest' />
                            </button>
                            <button className={`${cx('actions-btn')}`}>
                                <Icons.TwitterIcon className='twitter' />
                            </button>
                        </div>
                    </div>
                    <div className='divider'></div>
                    <div className={`${cx('action-like')}`}>
                        <Icons.HeartEmptyIcon
                            className={`${cx('heart-icon')} mr8`}
                        />
                        <div className={`${cx('like-text')}`}>Likes (17k)</div>
                    </div>
                </div>
            </div>
            <div className={`${cx('detail-right-container')}`}>
                <div className={`${cx('name-product-container')} mb12`}>
                    <span className={`${cx('badge-product')} mr8`}>Likes</span>
                    <span className={`${cx('name-product')}`}>
                        áo khoác bomber thời trang thu đông nam nữ - áo bomber
                        gió, nỉ gấu hàng 1 lớp form rộng, unisex, freesize giá
                        rẻ nhất ❤❤
                    </span>
                </div>
                <div className={`${cx('count-actions-container')} mb12`}>
                    <div className={`${cx('count-ratings')} d-flex mr8`}>
                        <div className={`${cx('count-number')} fz16 mr8`}>
                            4.5
                        </div>
                        <Rating
                            name='half-rating'
                            value={2.5}
                            precision={0.5}
                            // onChange={handleRating}
                        />
                    </div>
                    <div className='divider'></div>
                    <div className={`${cx('count-comments')} d-flex`}>
                        <div className={`${cx('count-number')} fz16 mr8 ml8`}>
                            3.8k
                        </div>
                        <div className={`${cx('count-text')} fz16 mr8`}>
                            Comments
                        </div>
                    </div>
                    <div className='divider'></div>
                    <div className={`${cx('count-sells')} d-flex`}>
                        <div className={`${cx('count-number')} fz16 mr8 ml8`}>
                            7.8k
                        </div>
                        <div className={`${cx('count-text')} fz16 mr8`}>
                            Sells
                        </div>
                        <Icons.QuestionIcon
                            className={`${cx('question-icon')}`}
                        />
                    </div>
                </div>
                <div className={`${cx('price-container')} mb12`}>
                    <div className={`${cx('price')} fz16 mb12`}>
                        <sup>vnd</sup>
                        <span>65.000</span>
                        <span> - </span>
                        <sup>vnd</sup>
                        <span>120.000</span>
                    </div>
                    <div className={`${cx('desc-price')}`}>
                        <Icons.SymbolIcon />
                        <div className={`${cx('desc-text-container')} ml8`}>
                            <div className={`${cx('desc-text-top')} mb8`}>
                                <span className='mr8 fz16'>
                                    Giá đã bao gồm VAT
                                </span>
                                <Icons.QuestionIcon />
                            </div>
                            <div className={`${cx('desc-text-bottom')} fz14`}>
                                Miễn phí vận chuyển cho đơn hàng trên 200.000đ
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${cx('code-sales-container')} mb12`}>
                    <div className={`${cx('sales-text')} mr8 fz16`}>
                        Code Sales Of Shop
                    </div>
                    <div className={`${cx('code-sales-lists')}`}>
                        <div className={`${cx('code-sales-item')} fz14`}>
                            <span className='mr4'>Sales</span>
                            <sup className='mr2'>vnd</sup>
                            <span className='fz14'>5k</span>
                        </div>
                    </div>
                    <div className={`${cx('code-sales-lists')}`}>
                        <div className={`${cx('code-sales-item')} fz14`}>
                            <span className='mr4'>Sales</span>
                            <sup className='mr2'>vnd</sup>
                            <span className='fz14'>10k</span>
                        </div>
                    </div>
                </div>
                <div className={`${cx('ship-container')} mb12`}>
                    <div className={`${cx('ship-text')} fz16 mr30 mb-auto`}>
                        Ship
                    </div>
                    <div className={`${cx('ship-desc-container')}`}>
                        <div className='d-flex align-center'>
                            <Image
                                src='/images/logo-ship.png'
                                alt='logo-ship'
                                className={`${cx('logo-ship')}`}
                            />
                            <div className={`${cx('ship-text')} ml8 fz16`}>
                                Free Ship
                            </div>
                        </div>
                        <div className='d-flex align-center'>
                            <Icons.ShipAddressIcon />
                            <div className={`${cx('ship-text')} ml8 fz16`}>
                                Ship To: Ho Chi Minh City
                            </div>
                        </div>
                        <div>
                            <div className={`${cx('ship-text')} fz16 mt4`}>
                                Fee Ship: 20.000
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${cx('color-product-container')} mb12`}>
                    <div className={`${cx('ship-text')} fz16 mr30`}>Color</div>
                    <div className={`${cx('color-lists')}`}>
                        <div className={`${cx('color-item')} fz16`}>Green</div>
                        <div className={`${cx('color-item')} fz16`}>Red</div>
                        <div className={`${cx('color-item')} fz16`}>Blue</div>
                    </div>
                </div>
                <div className={`${cx('color-product-container')} mb12`}>
                    <div className={`${cx('ship-text')} fz16 mr30`}>Sizes</div>
                    <div className={`${cx('color-lists')}`}>
                        <div className={`${cx('color-item')} fz16`}>M</div>
                        <div className={`${cx('color-item')} fz16`}>L</div>
                        <div className={`${cx('color-item')} fz16`}>XL</div>
                    </div>
                </div>
                <div className={`${cx('color-product-container')} mb12`}>
                    <div className={`${cx('ship-text')} fz16 mr30`}>
                        Quantity
                    </div>
                    <div className={`${cx('size-container')}`}>
                        <div className={`${cx('sub-product')}`}>-</div>
                        <div className={`${cx('quantity')}`}>
                            <input type='text' name='quantity' />
                        </div>
                        <div className={`${cx('plus-product')}`}>+</div>
                    </div>
                    <div className={`${cx('')} fz16 ml8`}>
                        3555 sản phẩm có sẵn
                    </div>
                </div>
                <div className={`${cx('color-product-container')} mb12`}>
                    <button className={`${cx('btn', 'bgc-opacity')}`}>
                        <div className='flex-center'>
                            <Icons.CartIcons />
                            <span className='fz16 ml8'>Thêm Vào Giỏ Hàng</span>
                        </div>
                    </button>
                    <button className={`${cx('btn', 'bgc')} fz16 ml8`}>
                        Mua Ngay
                    </button>
                </div>
                <div className={`${cx('secure-container')}`}>
                    <div className='flex-start'>
                        <Image
                            src='/images/secure-logo.png'
                            alt='secure'
                            className={`${cx('secure-logo')}`}
                        />
                        <span className='fz16 ml8'>Shopee Đảm Bảo</span>
                        <span className='fz14 ml8'>
                            3 Ngày Trả Hàng / Hoàn Tiền
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;
