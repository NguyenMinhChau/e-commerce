/* eslint-disable no-unused-vars */
import React from 'react';
import className from 'classnames/bind';
import Pagination from '@mui/material/Pagination';
import { Icons } from '../';
import { useAppContext } from '../../utils';
import { ACpaginations } from '../../app/';
import styles from './TableData.module.css';

const cx = className.bind(styles);

const ThRender = ({ item }) => {
    return (
        <>
            {item && (
                <th className={item.sort && 'hovered'}>
                    {item.name} {item.sort && <Icons.SortIcons />}
                </th>
            )}
        </>
    );
};

function TableData({ headers, data, totalData, children, className }) {
    const { state, dispatch } = useAppContext();
    const {
        pagination: { limit, page },
    } = state;
    const {
        name,
        column1,
        column2,
        column3,
        column4,
        column5,
        column6,
        column7,
    } = headers;
    const classed = cx('table-container', className);
    const lengthHeades = Object.keys(headers).length;
    const handlePage = (e, value) => {
        dispatch(
            ACpaginations.setPagination({
                ...state.pagination,
                page: parseInt(value),
            })
        );
    };
    return (
        <div className={classed}>
            <table className='table'>
                <thead>
                    <tr>
                        <ThRender item={column1} />
                        <ThRender item={column2} />
                        <ThRender item={column3} />
                        <ThRender item={column4} />
                        <ThRender item={column5} />
                        <ThRender item={column6} />
                        <ThRender item={column7} />
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length > 0 ? (
                        <>{children}</>
                    ) : (
                        <tr>
                            <td colSpan={lengthHeades} className='text-center'>
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className={`${cx('item-pagination-container')}`}>
                <Pagination
                    count={Math.ceil(totalData / limit)}
                    variant='outlined'
                    value={page}
                    shape='rounded'
                    onChange={handlePage}
                    showFirstButton
                    showLastButton
                />
            </div>
        </div>
    );
}

export default TableData;
