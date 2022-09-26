import React from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Image } from '../';
import styles from './Notify.module.css';

const cx = className.bind(styles);

function Notify() {
    const data = [1, 2, 3, 4, 6, 7, 8, 9, 10];
    return (
        <div className={`${cx('container')}`}>
            <header className={`${cx('notify-header')}`}>
                <h3>Thông báo mới nhận</h3>
            </header>
            <div className={`${cx('notify-list')}`}>
                {data.map((item, index) => (
                    <Link to='#' className={`${cx('notify-item')}`} key={index}>
                        <Image src='' alt='' className={cx('notify-image')} />
                        <div className={`${cx('notify-info')}`}>
                            <span className={`${cx('notify-name')}`} title=''>
                                Xác thực chính hãng các sản phẩm thuộc mỹ phẩm
                                Ohui chính hãng
                            </span>
                            <span className={`${cx('notify-desc')}`} title=''>
                                Mô tả: Hidden là giải pháp xác thực hàng chính
                                hãng bằng công nghệ tiên tiến nhất hiện nay
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
            <footer className={`${cx('notify-footer')}`}>
                <Link to='#' className={`${cx('notify-footer-btn')}`}>
                    Xem tất cả ...
                </Link>
            </footer>
        </div>
    );
}

export default Notify;
