import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import { Header, Sidebar, Footer } from '../';
import styles from './DefaultLayout.module.css';

const cx = className.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={`${cx('container')}`}>
            <Header />
            <div className={`${cx('content')}`}>
                <Sidebar />
                <div className={`${cx('main')}`}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
