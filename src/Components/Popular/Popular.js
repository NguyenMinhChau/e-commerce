import React from 'react';
import className from 'classnames/bind';
import { handleLaguage } from '../../utils';
import styles from './Popular.module.css';
import { Link } from 'react-router-dom';
import routers from '../../Routers/routers';

const cx = className.bind(styles);

function Popular() {
    const data = [
        {
            name: 'Công nghệ',
        },
        {
            name: 'Mỹ phẩm',
        },
        {
            name: 'Đồ gia dụng',
        },
        {
            name: 'Balo',
        },
        {
            name: 'Dép',
        },
        {
            name: 'Khẩu trang',
        },
    ];
    const path = (path) => {
        return handleLaguage
            .removeAccentsVietNamese(path)
            .toLowerCase()
            .replace(/\s+/g, '-');
    };
    return (
        <div className={`${cx('container')}`}>
            {data.map((item, index) => (
                <Link
                    to={`${routers.products}/${routers.productType}/${path(
                        item.name
                    )}`}
                    className={`${cx('popular-item')}`}
                    key={index}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    );
}

export default Popular;
