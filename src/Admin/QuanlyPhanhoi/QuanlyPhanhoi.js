import React, { useState } from 'react';
import className from 'classnames/bind';
import Rating from '@mui/material/Rating';
import { FormInput, Icons, ModalConfirm, TableData } from '../../Components';
import { qlph, useAppContext } from '../../utils';
import { ACtoogles } from '../../app/';
import styles from './QuanlyPhanhoi.module.css';

const cx = className.bind(styles);

function QuanlyPhanhoi() {
    const [idDelete, setIdDelete] = useState(null);
    const { state, dispatch } = useAppContext();
    const { toogleConfirm } = state;
    const modalConfirmTrue = (e, id) => {
        e.stopPropagation();
        setIdDelete(id);
        dispatch(ACtoogles.toogleConfirm(true));
    };
    const modalConfirmFalse = (e) => {
        e.stopPropagation();
        dispatch(ACtoogles.toogleConfirm(false));
    };
    const deleteAction = async (id) => {
        try {
            await 1;
            alert('Delete id: ' + id);
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
                            <td>{item.stt}</td>
                            <td>{item.sanpham}</td>
                            <td>{item.ngay}</td>
                            <td>{item.tennguoidung}</td>
                            <td>
                                <Rating
                                    name='read-only'
                                    value={item.danhgia}
                                    readOnly
                                />
                            </td>
                            <td>{item.noidung}</td>
                            <td>
                                <button className='btn-table completebgc'>
                                    <Icons.ViewIcons />
                                </button>
                                <button
                                    className='btn-table cancelbgc'
                                    onClick={(e) =>
                                        modalConfirmTrue(e, item.stt)
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
                <h3 className='fz22 mb8'>Quản lý phản hồi</h3>
                <div className={`${cx('top-container')}`}>
                    <FormInput
                        type='text'
                        name='search'
                        placeholder='Aa...'
                        classNameInput={`${cx('input')}`}
                    />
                </div>
                <TableData
                    headers={qlph.headers}
                    data={qlph.data}
                    totalData={qlph.data.length}
                >
                    <RenderBodyTable data={qlph.data} />
                </TableData>
            </div>
            {toogleConfirm && (
                <ModalConfirm
                    titleModal='Delete Confirm'
                    open={modalConfirmTrue}
                    close={modalConfirmFalse}
                    onClick={() => deleteAction(idDelete)}
                >
                    <p className='fz14'>You're sure delete this actions?</p>
                </ModalConfirm>
            )}
        </>
    );
}

export default QuanlyPhanhoi;
