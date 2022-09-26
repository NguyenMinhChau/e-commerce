import React from 'react';
import className from 'classnames/bind';
import { Icons, CategoryList } from '../../Components';
import styles from './Sidebar.module.css';

const cx = className.bind(styles);

function Sidebar() {
    return (
        <div className={`${cx('container')}`}>
            <h3 className={`${cx('header')}`}>
                <Icons.ListIcon />
                <span className='ml8'>Danh mục</span>
            </h3>
            <CategoryList />
        </div>
    );
}

export default Sidebar;
