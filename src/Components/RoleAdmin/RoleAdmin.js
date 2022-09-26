import React from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Icons } from '../';
import styles from './RoleAdmin.module.css';
import routers from '../../Routers/routers';

const cx = className.bind(styles);

function RoleAdmin() {
    return (
        <div className={`${cx('container')}`}>
            <div className={`${cx('home-admin')}`}>
                <Link
                    to={routers.tkdt}
                    className={`${cx('home-admin-button')}`}
                >
                    <Icons.SecureIcon />{' '}
                    <span className='ml8'>Thống kê doanh thu</span>
                </Link>
                <Link
                    to={routers.tksp}
                    className={`${cx('home-admin-button')}`}
                >
                    <Icons.SecureIcon />{' '}
                    <span className='ml8'>Thống kê sản phẩm</span>
                </Link>
                <Link
                    to={routers.qlsp}
                    className={`${cx('home-admin-button')}`}
                >
                    <Icons.SecureIcon />{' '}
                    <span className='ml8'>Quản lý sản phẩm</span>
                </Link>
                <Link
                    to={routers.qlnd}
                    className={`${cx('home-admin-button')}`}
                >
                    <Icons.SecureIcon />{' '}
                    <span className='ml8'>Quản lý người dùng</span>
                </Link>
                <Link
                    to={routers.qlph}
                    className={`${cx('home-admin-button')}`}
                >
                    <Icons.SecureIcon />{' '}
                    <span className='ml8'>Quản lý phản hồi</span>
                </Link>
            </div>
        </div>
    );
}

export default RoleAdmin;
