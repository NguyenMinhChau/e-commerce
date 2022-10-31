/* eslint-disable array-callback-return */
import React, { useState, useRef } from 'react';
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
import { SVsendEmailOrder } from '../../services/email';
import { setCartList } from '../../app/payloads/payloadCart';

const cx = className.bind(styles);

function CartDetail() {
    const { state, dispatch } = useAppContext();
    const {
        currentUser,
        toogleConfirm,
        data: { dataCartList },
        pagination: { page, limit },
    } = state;
    const [idDelete, setIdDelete] = useState(null);
    const [toogleAddtoCartError, setToogleAddtoCartError] = useState(false);
    const inputRef = useRef();
    const modalConfirmTrue = (e, id) => {
        e.stopPropagation();
        setIdDelete(id);
        dispatch(ACtoogles.toogleConfirm(true));
    };
    const modalConfirmFalse = (e) => {
        e.stopPropagation();
        dispatch(ACtoogles.toogleConfirm(false));
    };
    const modalToogleAddtoCartErrorTrue = (e) => {
        e.stopPropagation();
        setToogleAddtoCartError(true);
    };
    const modalToogleAddtoCartErrorFalse = (e) => {
        e.stopPropagation();
        setToogleAddtoCartError(false);
    };
    const deleteAction = async (id) => {
        try {
            await 1;
            dataCartList.splice(id, 1);
            dispatch(ACtoogles.toogleConfirm(false));
        } catch (err) {
            console.log(err);
        }
    };
    const handleChangeQuantity = (e, id) => {
        dataCartList.filter((item) => {
            if (item.id === id) {
                if (parseInt(e.target.value) > parseInt(item?.inventory)) {
                    setToogleAddtoCartError(true);
                } else {
                    item.quantity = e.target.value;
                }
            }
        });
        dispatch(setCartList([...dataCartList]));
    };
    const handlePlusQuantity = (inventory, id) => {
        if (parseInt(inputRef.current.value) < parseInt(inventory)) {
            // setQuantity(parseInt(inputRef.current.value) + 1);
            dataCartList.filter((item) => {
                if (item.id === id) {
                    if (item.quantity < item?.inventory) {
                        item.quantity = parseInt(item.quantity) + 1;
                    } else {
                        setToogleAddtoCartError(true);
                    }
                }
            });
            dispatch(setCartList([...dataCartList]));
        } else {
            // setQuantity(inventory);
            dataCartList.filter((item) => {
                if (item.id === id) {
                    item.quantity = inventory;
                }
            });
            dispatch(setCartList([...dataCartList]));
        }
    };
    const handleSubQuantity = (id) => {
        if (parseInt(inputRef.current.value) > 1) {
            // setQuantity(parseInt(inputRef.current.value) - 1);
            dataCartList.filter((item) => {
                if (item.id === id) {
                    item.quantity = parseInt(item.quantity) - 1;
                }
            });
            dispatch(setCartList([...dataCartList]));
        } else {
            // setQuantity(1);
            dataCartList.filter((item) => {
                if (item.id === id) {
                    item.quantity = 1;
                }
            });
            dispatch(setCartList([...dataCartList]));
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
                            <td style={{ maxWidth: '150px' }}>{item?.name}</td>
                            <td>{moneys.VND(item?.price)}</td>
                            <td
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <div className={`${cx('size-container')}`}>
                                    <div
                                        className={`${cx('sub-product')}`}
                                        onClick={() =>
                                            handleSubQuantity(item?.id)
                                        }
                                    >
                                        -
                                    </div>
                                    <div className={`${cx('quantity')}`}>
                                        <input
                                            type='text'
                                            name='quantity'
                                            value={item?.quantity}
                                            onChange={(e) =>
                                                handleChangeQuantity(
                                                    e,
                                                    item?.id
                                                )
                                            }
                                            ref={inputRef}
                                        />
                                    </div>
                                    <div
                                        className={`${cx('plus-product')}`}
                                        onClick={() =>
                                            handlePlusQuantity(
                                                item?.inventory,
                                                item?.id
                                            )
                                        }
                                    >
                                        +
                                    </div>
                                </div>
                            </td>
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
    const handleOrderEmail = () => {
        SVsendEmailOrder({
            dataCartList,
            currentUser,
        });
    };
    return (
        <>
            <div className={`${cx('container')}`}>
                {dataCartList.length > 0 && (
                    <div className={`${cx('top')} d-flex`}>
                        <Link
                            className={`${cx('btn')} confirmbgc`}
                            to={routers.checkout}
                            onClick={handleOrderEmail}
                        >
                            Tiến hành đặt hàng và thanh toán
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
                    textActionMain='Delete'
                    onClick={() => deleteAction(idDelete)}
                >
                    <p className='fz14'>You're sure delete this actions?</p>
                </ModalConfirm>
            )}
            {toogleAddtoCartError && (
                <ModalConfirm
                    titleModal='Thông báo'
                    open={modalToogleAddtoCartErrorTrue}
                    close={modalToogleAddtoCartErrorFalse}
                >
                    <p className='fz14'>
                        Số lượng sản phẩm trong kho không đủ cập nhật vào giỏ
                    </p>
                </ModalConfirm>
            )}
        </>
    );
}

export default CartDetail;
