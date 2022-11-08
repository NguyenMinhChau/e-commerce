import React from 'react';
import className from 'classnames/bind';
import styles from './CallMe.module.css';

const cx = className.bind(styles);

function CallMe() {
    return (
        <div className={`${cx('hotline-phone-ring-wrap')}`}>
            <div className={`${cx('hotline-phone-ring')}`}>
                <div className={`${cx('hotline-phone-ring-circle')}`}></div>
                <div
                    className={`${cx('hotline-phone-ring-circle-fill')}`}
                ></div>
                <div className={`${cx('hotline-phone-ring-img-circle')}`}>
                    <a href='tel:0987654321' className={`${cx('pps-btn-img')}`}>
                        <img
                            src='https://nguyenhung.net/wp-content/uploads/2019/05/icon-call-nh.png'
                            alt='Gọi điện thoại'
                            width='50'
                        />
                    </a>
                </div>
            </div>
            <div className={`${cx('hotline-bar')}`}>
                <a href='tel:0398365404'>
                    <span className={`${cx('text-hotline')}`}>0398365404</span>
                </a>
            </div>
        </div>
    );
}

export default CallMe;
