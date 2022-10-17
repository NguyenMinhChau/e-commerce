import React from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../utils';
import { setSearchHistory } from '../../app/payloads/payloadSearch';
import styles from './SearchHistory.module.css';
import { ACgetalls } from '../../app/';
import { Icons } from '..';
import { getAllProduct } from '../../services/product';

const cx = className.bind(styles);

function SearchHistory({ data }) {
    const { state, dispatch } = useAppContext();
    const {
        pagination: { page, limit },
    } = state;
    const handleDelete = (e, index) => {
        e.stopPropagation();
        e.preventDefault();
        let newData = [...data];
        newData.splice(index, 1);
        dispatch(setSearchHistory(newData));
    };
    const handleClick = async (e, category) => {
        try {
            e.preventDefault();
            e.stopPropagation();
            getAllProduct({
                page,
                limit,
                category,
                dispatch,
                ACgetalls,
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className={`${cx('container')}`}>
            <h3 className={`${cx('search-history-heading')}`}>
                Lịch sử tìm kiếm
            </h3>
            <div className={`${cx('search-history-list')}`}>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <Link
                            to='#'
                            className={`${cx('search-history-item')}`}
                            key={index}
                            onClick={(e) => handleClick(e, item)}
                        >
                            <span>{item}</span>
                            <div onClick={(e) => handleDelete(e, index)}>
                                <Icons.CloseIcon />
                            </div>
                        </Link>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                        <p style={{ fontSize: '15px' }}>
                            Không có lịch sử tìm kiếm
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchHistory;
