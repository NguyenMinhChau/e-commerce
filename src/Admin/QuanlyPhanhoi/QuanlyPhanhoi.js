/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import Rating from '@mui/material/Rating';
import { FormInput, Icons, ModalConfirm, TableData } from '../../Components';
import {
    qlph,
    useAppContext,
    indexTable,
    dates,
    requestRefreshToken,
} from '../../utils';
import { ACtoogles, ACgetalls, ACusers } from '../../app/';
import { feedbacks, products, users } from '../../services';
import styles from './QuanlyPhanhoi.module.css';
import { SVdeleteFeedback } from '../../services/feedback';

const cx = className.bind(styles);

function QuanlyPhanhoi() {
    const [idDelete, setIdDelete] = useState(null);
    const { state, dispatch } = useAppContext();
    const {
        toogleConfirm,
        currentUser,
        pagination: { page, limit },
        data: { dataFeedBacks, dataProducts, dataUsers },
    } = state;
    useEffect(() => {
        feedbacks.getAllFeedback({
            data: currentUser,
            page,
            limit,
            dispatch,
            ACgetalls,
        });
        products.getAllProduct({
            data: currentUser,
            // page,
            // limit,
            dispatch,
            ACgetalls,
        });
        users.getAll({
            data: currentUser,
            // page,
            // limit,
            dispatch,
            ACgetalls,
        });
    }, [page, limit]);
    const data = dataFeedBacks?.feedbacks || [];
    const dataProduct = dataProducts?.products || [];
    const dataUser = dataUsers?.users || [];
    // get product from array product id in feedbacks
    const getProduct = (id) => {
        const product = dataProduct.find((item) => item._id === id);
        return product?.name;
    };
    // get name product
    const x = [];
    data.map((item) => {
        item.product.map((y) => {
            x.push({
                _id: item._id,
                nameProduct: getProduct(y),
                createdAt: item?.createdAt,
                rating: item?.rating,
                content: item?.content,
                username: dataUser.find((u) => u?._id === item?.user)?.username,
            });
        });
        return x;
    });

    const modalConfirmTrue = (e, id) => {
        e.stopPropagation();
        setIdDelete(id);
        dispatch(ACtoogles.toogleConfirm(true));
    };
    const modalConfirmFalse = (e) => {
        e.stopPropagation();
        dispatch(ACtoogles.toogleConfirm(false));
    };
    const deleteAPI = (data, id) => {
        SVdeleteFeedback({
            token: data?.token,
            id,
            dispatch,
            ACtoogles,
        });
    };
    const handleDelete = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                deleteAPI,
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
                            <td style={{ maxWidth: '150px' }}>
                                {item.nameProduct}
                            </td>
                            <td>
                                {dates.formatDate(item.createdAt, 'DD/MM/YYYY')}
                            </td>
                            <td>{item.username}</td>
                            <td>
                                <Rating
                                    name='read-only'
                                    value={parseFloat(item.rating)}
                                    precision={0.5}
                                    readOnly
                                />
                            </td>
                            <td
                                style={{ maxWidth: '150px' }}
                                dangerouslySetInnerHTML={{
                                    __html: item.content.replace(
                                        /<img[^>]*>/g,
                                        (match) => {
                                            return match
                                                .replace(
                                                    /width="[^"]*"/g,
                                                    'width="100%"'
                                                )
                                                .replace(
                                                    /height="[^"]*"/g,
                                                    'height="120"'
                                                )
                                                .replace(
                                                    /style="[^"]*"/g,
                                                    'style="object-fit: cover;"'
                                                );
                                        }
                                    ),
                                }}
                            ></td>
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
                    data={data}
                    totalData={dataFeedBacks.total}
                >
                    <RenderBodyTable data={x} />
                </TableData>
            </div>
            {toogleConfirm && (
                <ModalConfirm
                    titleModal='Delete Confirm'
                    open={modalConfirmTrue}
                    close={modalConfirmFalse}
                    textActionMain='Delete'
                    onClick={() => handleDelete(idDelete)}
                >
                    <p className='fz14'>You're sure delete this actions?</p>
                </ModalConfirm>
            )}
        </>
    );
}

export default QuanlyPhanhoi;
