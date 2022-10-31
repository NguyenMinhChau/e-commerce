import React from 'react';
import className from 'classnames/bind';
import { LinkedinShareButton, LinkedinIcon } from 'react-share';
import styles from './ShareLinkedln.module.css';

const cx = className.bind(styles);

function ShareLinkedln({ slug, name, desc }) {
    return (
        <div className={`${cx('share-linkedln')} ml8`}>
            <LinkedinShareButton
                title={name}
                summary='blabla'
                url={`https://shopsmallnmc.netlify.app/products/detail/${slug}`}
            >
                <LinkedinIcon style={{ height: '25px', width: '25px' }} />
            </LinkedinShareButton>
        </div>
    );
}

export default ShareLinkedln;
