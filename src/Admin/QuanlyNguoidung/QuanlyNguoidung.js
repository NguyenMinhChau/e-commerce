/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { FormInput, Icons, ModalConfirm, TableData } from '../../Components';
import {
    qlnd,
    useAppContext,
    texts,
    indexTable,
    dates,
    requestRefreshToken,
} from '../../utils';
import { ACtoogles, ACgetalls, ACusers } from '../../app/';
import { users } from '../../services';
import styles from './QuanlyNguoidung.module.css';

const cx = className.bind(styles);

function QuanlyNguoidung() {
    const [idDelete, setIdDelete] = useState(null);
    const [searchVal, setSearchVal] = useState('');
    const { state, dispatch } = useAppContext();
    const {
        currentUser,
        toogleConfirm,
        pagination: { page, limit },
        data: { dataUsers },
    } = state;
    useEffect(() => {
        users.getAll({
            page,
            limit,
            dispatch,
            state,
            ACgetalls,
        });
    }, [page, limit]);
    let DATA_FLAG = users.searchUser({ dataUsers, searchVal, texts });

    const modalConfirmTrue = (e, id) => {
        e.stopPropagation();
        setIdDelete(id);
        dispatch(ACtoogles.toogleConfirm(true));
    };
    const modalConfirmFalse = (e) => {
        e.stopPropagation();
        dispatch(ACtoogles.toogleConfirm(false));
    };
    const handleChangeSearch = (e) => {
        setSearchVal(e.target.value);
    };
    const deleteUserAPI = (data, id) => {
        users.deleteUser({
            token: data?.token,
            id,
        });
    };
    const handleDeleteUser = async (id) => {
        try {
            await 1;
            requestRefreshToken(
                currentUser,
                deleteUserAPI,
                state,
                dispatch,
                ACusers,
                id
            );
            dispatch(ACtoogles.toogleConfirm(false));
        } catch (err) {
            console.log(err);
        }
    };
    const RenderBodyTable = ({ data }) => {
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{indexTable(page, limit, index)}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>
                                {dates.formatDate(item.createdAt, 'DD/MM/YYYY')}
                            </td>
                            <td>{item.role}</td>
                            <td>
                                <span
                                    className={`status ${
                                        texts.lowercase(item.rank || '') + 'bgc'
                                    }`}
                                >
                                    {item.rank}
                                </span>
                            </td>
                            <td>
                                <button className='btn-table completebgc'>
                                    <Icons.ViewIcons />
                                </button>
                                <button
                                    className='btn-table cancelbgc'
                                    onClick={(e) =>
                                        modalConfirmTrue(e, item._id)
                                    }
                                >
                                    <Icons.DeleteIcons />
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    };
    return (
        <>
            <div className={`${cx('thongke-container')}`}>
                <h3 className='fz22 mb8'>Quản lý người dùng</h3>
                <div className={`${cx('top-container')}`}>
                    <FormInput
                        type='text'
                        name='search'
                        placeholder='Aa...'
                        onChange={handleChangeSearch}
                        classNameInput={`${cx('input')}`}
                    />
                </div>
                <TableData
                    headers={qlnd.headers}
                    data={DATA_FLAG}
                    totalData={dataUsers?.total}
                >
                    <RenderBodyTable data={DATA_FLAG} />
                </TableData>
            </div>
            {toogleConfirm && (
                <ModalConfirm
                    titleModal='Delete Confirm'
                    open={modalConfirmTrue}
                    close={modalConfirmFalse}
                    onClick={() => handleDeleteUser(idDelete)}
                >
                    <p className='fz14'>You're sure delete this actions?</p>
                </ModalConfirm>
            )}
        </>
    );
}

export default QuanlyNguoidung;
