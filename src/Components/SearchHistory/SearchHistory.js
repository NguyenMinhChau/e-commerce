import React from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './SearchHistory.module.css';
import { Icons } from '..';

const cx = className.bind(styles);

function SearchHistory() {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    return (
        <div className={`${cx('container')}`}>
            <h3 className={`${cx('search-history-heading')}`}>
                Lịch sử tìm kiếm
            </h3>
            <div className={`${cx('search-history-list')}`}>
                {data.map((item, index) => (
                    <Link
                        to='#'
                        className={`${cx('search-history-item')}`}
                        key={index}
                    >
                        <span>Điện thoại và phụ kiện</span>
                        <Icons.CloseIcon />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SearchHistory;
