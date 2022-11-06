import React from 'react';
import className from 'classnames/bind';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import styles from './ShareTwitter.module.css';

const cx = className.bind(styles);

function ShareTwitter({ slug, name, desc }) {
    return (
        <div className={`${cx('share-linkedln')} ml8`}>
            <TwitterShareButton
                title={name}
                summary='blabla'
                url={`https://megamartnmc.netlify.app/products/detail/${slug}`}
            >
                <TwitterIcon style={{ height: '25px', width: '25px' }} />
            </TwitterShareButton>
        </div>
    );
}

export default ShareTwitter;
