import React from 'react';
import className from 'classnames/bind';
// import { Link } from 'react-router-dom';
// import routers from '../../Routers/routers';
// import { Image } from '../';
import styles from './PageNotFound.module.css';

const cx = className.bind(styles);

function PageNotFound() {
    return (
        <div className={`${cx('page-not-found-container')}`}>
            {/* <Image
                src='/svgs/404.svg'
                alt='pageNotFoundImage'
                className={`${cx('page-not-found-image')}`}
            />
            <p className={`${cx('backToHome')}`}>
                Back to <Link to={routers.home}>Home Page</Link>
            </p> */}
            <span className={`${cx('loader')}`}></span>
        </div>
    );
}

export default PageNotFound;
