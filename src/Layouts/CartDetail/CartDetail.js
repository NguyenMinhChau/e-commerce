import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './CartDetail.module.css';
import {
    moneys,
    cartDetail,
    useAppContext,
    dates,
    indexTable,
} from '../../utils';
import { Icons, Image, ModalConfirm, TableData } from '../../Components';
import { ACtoogles } from '../../app/';
import { Link } from 'react-router-dom';
import routers from '../../Routers/routers';

const cx = className.bind(styles);

function CartDetail() {
    const { state, dispatch } = useAppContext();
    const {
        toogleConfirm,
        data: { dataCartList },
        pagination: { page, limit },
    } = state;
    const [idDelete, setIdDelete] = useState(null);
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
            dataCartList.splice(id, 1);
            // alert('DeleteI id: ' + id);
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
                            <td>
                                <Image
                                    src={`${process.env.REACT_APP_URL_SERVER_IMAGE}${item?.thumbnail}`}
                                    alt={item?.name}
                                    className={`${cx('image')}`}
                                />
                            </td>
                            <td>{item?.name}</td>
                            <td>{moneys.VND(item?.price)}</td>
                            <td>{item?.quantity}</td>
                            <td>
                                {dates.formatDate(
                                    item?.createdAt,
                                    'DD/MM/YYYY'
                                )}
                            </td>
                            <td>
                                <button
                                    className='btn-table cancelbgc'
                                    onClick={(e) => modalConfirmTrue(e, index)}
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
            <div className={`${cx('container')}`}>
                {dataCartList.length > 0 && (
                    <div className={`${cx('top')} d-flex`}>
                        <Link
                            className={`${cx('btn')} confirmbgc`}
                            to={routers.checkout}
                        >
                            Tiến hành thanh toán
                        </Link>
                    </div>
                )}
                <TableData
                    headers={cartDetail.headers}
                    data={dataCartList}
                    totalData={dataCartList.length}
                >
                    <RenderBodyTable data={dataCartList} />
                </TableData>
            </div>
            {toogleConfirm && (
                <ModalConfirm
                    titleModal='Delete Product'
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

export default CartDetail;
