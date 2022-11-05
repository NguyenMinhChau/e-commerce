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
    store,
    requestRefreshToken,
} from '../../utils';
import {
    FormInput,
    Icons,
    Image,
    ModalConfirm,
    TableData,
} from '../../Components';
import { ACforms, ACtoogles, ACusers } from '../../app/';
import { Link, useNavigate } from 'react-router-dom';
import routers from '../../Routers/routers';
import { SVsendEmailOrder } from '../../services/email';
import { setCartList } from '../../app/payloads/payloadCart';
import { updateUser } from '../../services/user';

const cx = className.bind(styles);

function CartDetail() {
    const { state, dispatch } = useAppContext();
    const {
        currentUser,
        toogleConfirm,
        form: { address, phone },
        data: { dataCartList },
        pagination: { page, limit },
    } = state;
    const history = useNavigate();
    const refAddress = useRef();
    const refPhone = useRef();
    const [idDelete, setIdDelete] = useState(null);
    const [toogleAddtoCartError, setToogleAddtoCartError] = useState(false);
    const [toogleUpdateUser, setToogleUpdateUser] = useState(false);
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
    const modalToogleUpdateUserTrue = (e) => {
        e.stopPropagation();
        setToogleUpdateUser(true);
    };
    const modalToogleUpdateUserFalse = (e) => {
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
        if (!currentUser?.address || !currentUser?.phone) {
            setToogleUpdateUser(true);
        } else {
            SVsendEmailOrder({
                dataCartList,
                currentUser,
            });
        }
    };
    const updateAPI = (data, id) => {
        updateUser({
            token: data?.token,
            phone: refPhone.current?.value?.trim() || phone.trim(),
            address: refAddress.current?.value?.trim() || address.trim(),
            id,
        });
    };
    const handleChange = (e) => {
        dispatch(
            ACforms.setFormValue({
                address: refAddress.current.value,
                phone: refPhone.current.value,
            })
        );
    };
    const handleUpdateInfo = async (id) => {
        try {
            await 1;
            store.setStore({
                id: currentUser?.id,
                username: currentUser?.username,
                email: currentUser?.email,
                phone: refPhone.current?.value || phone,
                address: refAddress.current?.value || address,
                role: currentUser?.role,
                token: currentUser?.token,
            });
            dispatch(ACusers.setCurrentUser(store.getStore()));
            requestRefreshToken(
                currentUser,
                updateAPI,
                state,
                dispatch,
                ACusers,
                id
            );
            SVsendEmailOrder({
                dataCartList,
                currentUser: {
                    ...currentUser,
                    phone,
                    address,
                },
            });
            setToogleUpdateUser(false);
            history(routers.checkout);
        } catch (err) {}
    };
    return (
        <>
            <div className={`${cx('container')}`}>
                {dataCartList.length > 0 && (
                    <div className={`${cx('top')} d-flex`}>
                        <Link
                            className={`${cx('btn')} confirmbgc`}
                            to={
                                !currentUser?.address || !currentUser?.phone
                                    ? routers.cart
                                    : routers.checkout
                            }
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
                    router={{
                        textBack: 'Tiếp tục mua hàng',
                        textPage: 'Về trang chủ',
                        link: routers.home,
                    }}
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
            {toogleUpdateUser && (
                <ModalConfirm
                    open={modalToogleUpdateUserTrue}
                    close={modalToogleUpdateUserFalse}
                    textActionMain='Cập nhật'
                    titleModal='Vui lòng cập nhật thông tin'
                    onClick={() => handleUpdateInfo(currentUser?.id)}
                >
                    <FormInput
                        label='Địa chỉ'
                        type='text'
                        name='address'
                        value={refAddress.current?.value || address}
                        onChange={handleChange}
                        ref={refAddress}
                    />
                    <FormInput
                        label='Số điện thoại'
                        type='text'
                        name='phone'
                        value={refPhone.current?.value || phone}
                        onChange={handleChange}
                        ref={refPhone}
                    />
                </ModalConfirm>
            )}
        </>
    );
}

export default CartDetail;
