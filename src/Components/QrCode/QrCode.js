import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import { Image } from '..';
import styles from './QrCode.module.css';

const cx = className.bind(styles);

function QrCode() {
    return (
        <div className={`${cx('qrcode')}`}>
            <Image
                src='/svgs/qrCode.svg'
                alt='qrcode'
                className={`${cx('qrcode-img')}`}
            />
            <div className={`${cx('qrcode-apps')}`}>
                <Link
                    to='#'
                    target={'_blank'}
                    className={`${cx('qrcode-app-img')}`}
                >
                    <Image src='/images/ch_play.png' alt='Google Play' />
                </Link>
                <Link
                    to='#'
                    target={'_blank'}
                    className={`${cx('qrcode-app-img')}`}
                >
                    <Image src='/images/apple_store.png' alt='App Store' />
                </Link>
            </div>
        </div>
    );
}

export default QrCode;
