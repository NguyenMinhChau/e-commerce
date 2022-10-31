/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { FormInput, Icons, ModalConfirm, TableData } from '../../Components';
import { CreateProduct } from '../../Layouts';
import { products, users } from '../../services';
import {
    moneys,
    numbers,
    qlsp,
    useAppContext,
    indexTable,
    dates,
    requestRefreshToken,
} from '../../utils';
import {
    ACtoogles,
    ACgetalls,
    ACgetones,
    ACforms,
    ACfiles,
    ACusers,
} from '../../app/';
import styles from './QuanlySanpham.module.css';
import { SVsendEmailMarketing } from '../../services/email';

const cx = className.bind(styles);

function QuanlySanpham() {
    const [idDelete, setIdDelete] = useState(null);
    const { state, dispatch } = useAppContext();
    const {
        currentUser,
        toogleConfirm,
        toogleCreateProduct,
        pagination: { page, limit },
        data: { dataProducts, dataUsers },
    } = state;
    useEffect(() => {
        products.getAllProduct({
            data: currentUser,
            page,
            limit,
            state,
            dispatch,
            ACgetalls,
        });
        users.getAll({
            dispatch,
            ACgetalls,
        });
    }, [page, limit]);

    const data = dataProducts?.products || [];
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
    const modalEditProduct = (e, item) => {
        e.stopPropagation();
        dispatch(ACtoogles.toogleCreateProduct(true));
        dispatch(ACgetones.getAProduct(item));
        dispatch(ACfiles.setSingleFile([item.thumbnail]));
        dispatch(
            ACforms.setFormCreateProduct({
                name: item.name,
                price: item.price,
                description: item.description,
                reducedPrice: item.reducedPrice,
                category: item.category,
                brand: item.brand,
                percentReduced: item.percentReduced,
                rating: item.rating,
                inventory: item.inventory,
                priceImport: item.priceImport,
                dateImport: item.dateImport,
                shop: item.shop[0]._id,
            })
        );
    };
    const deleteProductAPI = (data, id) => {
        products.deleteProduct({
            token: data?.token,
            id,
            page,
            limit,
            dispatch,
            ACgetalls,
        });
    };
    const deleteAction = async (id) => {
        try {
            await 1;
            requestRefreshToken(
                currentUser,
                deleteProductAPI,
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
    const handleSendMailMarketing = async (slug) => {
        try {
            SVsendEmailMarketing({
                userList: dataUsers?.users,
                idProduct: slug,
            });
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
                            <td
                                style={{ maxWidth: '150px', lineHeight: '1.5' }}
                            >
                                {item.name}
                            </td>
                            <td>
                                {dates.formatDate(
                                    item.dateImport,
                                    'DD/MM/YYYY'
                                )}
                            </td>
                            <td>{moneys.VND(item.price)}</td>
                            <td>
                                {item.reducedPrice
                                    ? moneys.VND(item.reducedPrice)
                                    : ''}
                            </td>
                            <td>{numbers.number(item.sold)}</td>
                            <td>{numbers.number(item.inventory)}</td>
                            <td>
                                <button
                                    className='btn-table completebgc'
                                    onClick={(e) => modalEditProduct(e, item)}
                                >
                                    <Icons.EditIcon />
                                </button>
                                <button
                                    className='btn-table cancelbgc'
                                    onClick={(e) =>
                                        modalConfirmTrue(e, item._id)
                                    }
                                >
                                    <Icons.DeleteIcons />
                                </button>
                                <button
                                    className='btn-table vipbgc'
                                    onClick={() =>
                                        handleSendMailMarketing(item.slug)
                                    }
                                >
                                    <Icons.EmailMarketing />
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
                    className={`${cx('btn')} completebgc`}
                    onClick={modalCreateProduct}
                >
                    <div className='flex-center'>
                        {!toogleCreateProduct && <Icons.PlusIcon />}
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
                        data={data}
                        totalData={dataProducts.total}
                    >
                        <RenderBodyTable data={data} />
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
                    textActionMain='Delete'
                    onClick={() => deleteAction(idDelete)}
                >
                    <p className='fz14'>You're sure delete this actions?</p>
                </ModalConfirm>
            )}
        </>
    );
}

export default QuanlySanpham;
