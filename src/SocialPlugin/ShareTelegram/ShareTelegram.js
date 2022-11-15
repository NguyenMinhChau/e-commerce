import React from 'react';
import className from 'classnames/bind';
import { TelegramShareButton, TelegramIcon } from 'react-share';
import styles from './ShareTelegram.module.css';

const cx = className.bind(styles);

function ShareTelegram({ slug, name, desc }) {
    return (
        <div className={`${cx('share-linkedln')} ml8`}>
            <TelegramShareButton
                title={name}
                summary='blabla'
                url={`https://nguyenminhchau.site/products/detail/${slug}`}
            >
                <TelegramIcon style={{ height: '25px', width: '25px' }} />
            </TelegramShareButton>
        </div>
    );
}

export default ShareTelegram;
