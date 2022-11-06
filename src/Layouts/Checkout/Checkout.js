/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Checkout.module.css';
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
    Image,
    TableData,
    CheckoutPaypal,
    CheckoutStripe,
    CheckoutZalo,
    ModalConfirm,
    FormInput,
} from '../../Components';
import { ACforms, ACusers } from '../../app/';
import { updateUser } from '../../services/user';
import routers from '../../Routers/routers';

const cx = className.bind(styles);

function Checkout() {
    const { state, dispatch } = useAppContext();
    const [toogleConfirm, setToogleConfirm] = React.useState(false);
    const [idDelete, setIdDelete] = React.useState(null);
    const history = useNavigate();
    const {
        currentUser,
        data: { dataCartList },
        pagination: { page, limit },
        form: { address, phone },
    } = state;
    const refPhone = useRef();
    const refAddress = useRef();
    const totalBills = () => {
        return dataCartList.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };
    const modalConfirmTrue = (e, id) => {
        e.stopPropagation();
        setIdDelete(id);
        setToogleConfirm(true);
        dispatch(
            ACforms.setFormValue({
                address: currentUser?.address,
                phone: currentUser?.phone,
            })
        );
    };
    const modalConfirmFalse = (e) => {
        e.stopPropagation();
        setToogleConfirm(false);
    };
    const handleChange = (e) => {
        dispatch(
            ACforms.setFormValue({
                address: refAddress.current.value,
                phone: refPhone.current.value,
            })
        );
    };
    const RenderBodyTable = ({ data }) => {
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{indexTable(page, limit, index)}</td>
                            <td>
                                {item?.thumbnail?.endsWith('.png') ? (
                                    <Image
                                        src={`${
                                            process.env
                                                .REACT_APP_URL_SERVER_IMAGE
                                        }${item?.thumbnail?.replace(
                                            'src/uploads',
                                            ''
                                        )}`}
                                        alt={item?.name}
                                        className={`${cx('image')}`}
                                    />
                                ) : (
                                    <video
                                        style={{
                                            width: '150px',
                                            height: '150px',
                                        }}
                                        src={`${
                                            process.env
                                                .REACT_APP_URL_SERVER_IMAGE
                                        }${item?.thumbnail?.replace(
                                            'src/uploads',
                                            ''
                                        )}`}
                                        controls
                                    ></video>
                                )}
                            </td>
                            <td style={{ maxWidth: '150px' }}>{item?.name}</td>
                            <td>{moneys.VND(item?.price)}</td>
                            <td>{item?.quantity}</td>
                            <td>
                                {dates.formatDate(
                                    item?.createdAt,
                                    'DD/MM/YYYY'
                                )}
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    };
    const updateAPI = (data, id) => {
        updateUser({
            token: data?.token,
            phone: refPhone.current?.value?.trim() || phone.trim(),
            address: refAddress.current?.value?.trim() || address.trim(),
            id,
        });
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
            setToogleConfirm(false);
            history(routers.checkout);
        } catch (err) {}
    };
    return (
        <>
            <div className={`${cx('container')}`}>
                <div className={`${cx('top')} d-flex`}>
                    <div className={`${cx('title')} complete`}>
                        Tổng đơn hàng: {moneys.VND(totalBills())}
                    </div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                    <div className={`${cx('title')}`}>Thông tin khách hàng</div>
                    <div className={`${cx('info-user-container')}`}>
                        <div className={`${cx('card')}`}>
                            <div className={`${cx('card-item')}`}>
                                <div className={`${cx('card-text')} fwb`}>
                                    Họ và tên
                                </div>
                                <div className={`${cx('card-text')}`}>
                                    {currentUser?.username}
                                </div>
                            </div>
                            <div className={`${cx('card-item')}`}>
                                <div className={`${cx('card-text')} fwb`}>
                                    Email
                                </div>
                                <div className={`${cx('card-text')}`}>
                                    {currentUser?.email}
                                </div>
                            </div>
                            <div className={`${cx('card-item')}`}>
                                <div className={`${cx('card-text')} fwb`}>
                                    Số điện thoại
                                </div>
                                <div className={`${cx('card-text')}`}>
                                    {currentUser?.phone}
                                </div>
                            </div>
                            <div className={`${cx('card-item')}`}>
                                <div className={`${cx('card-text')} fwb`}>
                                    Địa chỉ
                                </div>
                                <div className={`${cx('card-text')}`}>
                                    {currentUser?.address}
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                className={`${cx('btn')} confirmbgc ml8`}
                                onClick={(e) =>
                                    modalConfirmTrue(e, currentUser?.id)
                                }
                            >
                                Cập nhật địa chỉ/Số điện thoại
                            </button>
                        </div>
                    </div>
                </div>
                <TableData
                    headers={cartDetail.headers}
                    data={dataCartList}
                    totalData={dataCartList.length}
                >
                    <RenderBodyTable data={dataCartList} />
                </TableData>
                {dataCartList.length > 0 && (
                    <div className={`${cx('paypal-button-container')}`}>
                        <div className={`${cx('paypal-button')}`}>
                            <CheckoutPaypal dataCartList={dataCartList} />
                        </div>
                        <div className={`${cx('paypal-button')}`}>
                            <CheckoutStripe dataCartList={dataCartList} />
                        </div>
                        <div className={`${cx('paypal-button')}`}>
                            <CheckoutZalo dataCartList={dataCartList} />
                        </div>
                        {/* <div className={`${cx('paypal-button')}`}>
                            <CheckoutVnpay dataCartList={dataCartList} />
                        </div> */}
                        {/* <div className={`${cx('paypal-button')}`}>
                            <CheckoutBaoKim dataCartList={dataCartList} />
                        </div> */}
                    </div>
                )}
            </div>
            {toogleConfirm && (
                <ModalConfirm
                    open={modalConfirmTrue}
                    close={modalConfirmFalse}
                    textActionMain='Cập nhật'
                    titleModal='Cập nhật thông tin'
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

export default Checkout;
