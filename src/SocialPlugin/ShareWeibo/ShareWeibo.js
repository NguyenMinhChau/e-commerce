import React from 'react';
import className from 'classnames/bind';
import { WeiboShareButton, WeiboIcon } from 'react-share';
import styles from './ShareWeibo.module.css';

const cx = className.bind(styles);

function ShareWeibo({ slug, name, desc }) {
    return (
        <div className={`${cx('share-linkedln')}`}>
            <WeiboShareButton
                title={name}
                summary='blabla'
                url={`https://shopsmallnmc.netlify.app/products/detail/${slug}`}
            >
                <WeiboIcon style={{ height: '25px' }} />
            </WeiboShareButton>
        </div>
    );
}

export default ShareWeibo;
