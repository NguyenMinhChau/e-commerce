import React, { useState } from 'react';
import className from 'classnames/bind';
import { FormInput, Icons, ModalConfirm, TableData } from '../../Components';
import { CreateProduct } from '../../Layouts';
import { moneys, numbers, qlsp, useAppContext } from '../../utils';
import { ACtoogles } from '../../app/';
import styles from './QuanlySanpham.module.css';

const cx = className.bind(styles);

function QuanlySanpham() {
    const [idDelete, setIdDelete] = useState(null);
    const { state, dispatch } = useAppContext();
    const { toogleConfirm, toogleCreateProduct } = state;
    const modalConfirmTrue = (e, id) => {
        e.stopPropagation();
        setIdDelete(id);
        dispatch(ACtoogles.toogleConfirm(true));
    };
    const modalConfirmFalse = (e) => {
        e.stopPropagation();
        dispatch(ACtoogles.toogleConfirm(false));
    };
    const modalCreateProduct = (e) => {
        e.stopPropagation();
        dispatch(ACtoogles.toogleCreateProduct(!toogleCreateProduct));
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
                            <td>{moneys.VND(item.giaban)}</td>
                            <td>{moneys.VND(item.giasale)}</td>
                            <td>{numbers.number(item.daban)}</td>
                            <td>{numbers.number(item.tonkho)}</td>
                            <td>
                                <button className='btn-table completebgc'>
                                    <Icons.EditIcon />
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
            <div className='mb12'>
                <button
                    className={`${cx('btn')} confirmbgc`}
                    onClick={modalCreateProduct}
                >
                    <div className='flex-center'>
                        <Icons.PlusIcon />
                        <span className='ml8'>
                            {!toogleCreateProduct ? 'Thêm mới' : 'Quay về'}
                        </span>
                    </div>
                </button>
            </div>
            {!toogleCreateProduct ? (
                <div className={`${cx('thongke-container')}`}>
                    <h3 className='fz22 mb8'>Quản lý sản phẩm</h3>
                    <div className={`${cx('top-container')}`}>
                        <FormInput
                            type='text'
                            name='search'
                            placeholder='Aa...'
                            classNameInput={`${cx('input')}`}
                        />
                    </div>
                    <TableData
                        headers={qlsp.headers}
                        data={qlsp.data}
                        totalData={qlsp.data.length}
                    >
                        <RenderBodyTable data={qlsp.data} />
                    </TableData>
                </div>
            ) : (
                <CreateProduct />
            )}
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

export default QuanlySanpham;
