import React from 'react';
import { Link } from 'react-router-dom';
import { Icons, Image } from '../../Components';
import className from 'classnames/bind';
import styles from './Footer.module.css';

const cx = className.bind(styles);

function Footer() {
    return (
        <div className={`${cx('container')}`}>
            <div className={`${cx('footer-top')}`}>
                <div className={`${cx('footer-top-item')}`}>
                    <h3 className={`${cx('footer-top-item-title')}`}>
                        Chăm sóc khách hàng
                    </h3>
                    <div className={`${cx('footer-top-item-list')}`}>
                        <Link to='#'>Trung tâm trợ giúp</Link>
                        <Link to='#'>Shop Mall</Link>
                        <Link to='#'>Hướng dẫn mua hàng</Link>
                    </div>
                </div>
                <div className={`${cx('footer-top-item')}`}>
                    <h3 className={`${cx('footer-top-item-title')}`}>
                        Giới thiệu
                    </h3>
                    <div className={`${cx('footer-top-item-list')}`}>
                        <Link to='#'>Quy định chung</Link>
                        <Link to='#'>Tuyển dụng</Link>
                        <Link to='#'>Điều khoản</Link>
                    </div>
                </div>
                <div className={`${cx('footer-top-item')}`}>
                    <h3 className={`${cx('footer-top-item-title')}`}>
                        Danh mục
                    </h3>
                    <div className={`${cx('footer-top-item-list')}`}>
                        <Link to='#'>Trang điểm</Link>
                        <Link to='#'>Điện thoại & Phụ kiện</Link>
                        <Link to='#'>Thiết bị điện tử</Link>
                        <Link to='#'>Balo & Túi ví nam</Link>
                        <Link to='#'>Thể thao và du lịch</Link>
                        <Link to='#'>Nhà sách online</Link>
                    </div>
                </div>
                <div className={`${cx('footer-top-item')}`}>
                    <h3 className={`${cx('footer-top-item-title')}`}>
                        Theo dõi
                    </h3>
                    <div className={`${cx('footer-top-item-list')}`}>
                        <Link to='#'>
                            <Icons.FacebookIcon />
                            <span className='ml8'>Facebook</span>
                        </Link>
                        <Link to='#'>
                            <Icons.InstagramIcon />
                            <span className='ml8'>Instagram</span>
                        </Link>
                        <Link to='#'>
                            <Icons.TwitterIcon />
                            <span className='ml8'>Twitter</span>
                        </Link>
                        <Link to='#'>
                            <Icons.LinkedlnIcon />
                            <span className='ml8'>Linkedln</span>
                        </Link>
                    </div>
                </div>
                <div className={`${cx('footer-top-item')}`}>
                    <h3 className={`${cx('footer-top-item-title')}`}>
                        Vào cửa hàng trên ứng dụng
                    </h3>
                    <div className={`${cx('footer-apps')}`}>
                        <Image
                            src='/svgs/qrCode.svg'
                            alt='qrcode'
                            className={cx('footer-qrcode')}
                        />
                        <div className={`${cx('footer-app-list')}`}>
                            <Link to='#'>
                                <Image
                                    src='/images/apple_store.png'
                                    alt='appleStore'
                                    className={cx('footer-app-item')}
                                />
                            </Link>
                            <Link to='#'>
                                <Image
                                    src='/images/ch_play.png'
                                    alt='chplay'
                                    className={cx('footer-app-item')}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${cx('footer-bottom')}`}>
                <h3 className={`${cx('footer-copyright')}`}>
                    Copyright &copy; Shopee Mall 2022 -{' '}
                    <span>{new Date().getFullYear()}</span>
                </h3>
            </div>
        </div>
    );
}

export default Footer;
