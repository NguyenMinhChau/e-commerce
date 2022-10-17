/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import {
    FormInput,
    TextArea,
    SelectOption,
    SingleUpload,
    // MultipleUpload,
} from '../../Components';
import { shops, products } from '../../services';
import { useAppContext, requestRefreshToken } from '../../utils';
import { ACtoogles, ACforms, ACgetalls, ACusers } from '../../app/';
import styles from './CreateProduct.css';
import routers from '../../Routers/routers';

const cx = className.bind(styles);

function CreateProduct() {
    const { state, dispatch } = useAppContext();
    const [showCategory, setShowCategory] = useState(false);
    const [showBranch, setShowBranch] = useState(false);
    const [showShopId, setShowShopId] = useState(false);
    const history = useNavigate();
    const {
        currentUser,
        singleFile,
        multipleFile,
        toogleCreateProduct,
        formCreateProduct: {
            name,
            price,
            description,
            reducedPrice,
            category,
            brand,
            percentReduced,
            rating,
            inventory,
            priceImport,
            dateImport,
            shop,
        },
        data: { dataShops, dataById },
        pagination: { page, limit },
    } = state;
    useEffect(() => {
        shops.getAllShop({
            data: currentUser,
            state,
            dispatch,
            page,
            limit,
            ACgetalls,
        });
    }, []);
    const dataSelectShop = dataShops?.shops?.map((item) => {
        return {
            label: item.name,
            value: item._id,
            id: item._id,
            image: item.image,
            address: item.address,
        };
    });
    const dataCategory = [
        { label: 'Điện thoại', value: 'DienThoai' },
        { label: 'Máy tính', value: 'MayTinh' },
        { label: 'Tai Nghe', value: 'TaiNghe' },
        { label: 'Máy lạnh', value: 'MayLanh' },
        { label: 'Máy giặt', value: 'MayGiat' },
        { label: 'Tủ lạnh', value: 'TuLanh' },
        { label: 'Tivi', value: 'Tivi' },
    ];
    const dataBranch = [
        { label: 'Điện tử', value: 'DienThoai' },
        { label: 'Đồ gia dụng', value: 'DoGiaDung' },
    ];
    const cancelCreate = (e) => {
        e.stopPropagation();
        dispatch(ACtoogles.toogleCreateProduct(!toogleCreateProduct));
    };
    const handleShowCategory = () => {
        setShowCategory(!showCategory);
    };
    const handleShowBranch = () => {
        setShowBranch(!showBranch);
    };
    const handleShowShopId = () => {
        setShowShopId(!showShopId);
    };
    const handleChangeInput = (e) => {
        dispatch(
            ACforms.setFormCreateProduct({
                ...state.formCreateProduct,
                [e.target.name]: e.target.value,
            })
        );
    };
    const handleChangeSelectCategory = (item) => {
        dispatch(
            ACforms.setFormCreateProduct({
                ...state.formCreateProduct,
                category: item,
            })
        );
    };
    const handleChangeSelectBranch = (item) => {
        dispatch(
            ACforms.setFormCreateProduct({
                ...state.formCreateProduct,
                brand: item,
            })
        );
    };
    const handleChangeSelectShop = (item) => {
        dispatch(
            ACforms.setFormCreateProduct({
                ...state.formCreateProduct,
                shop: item,
            })
        );
    };
    const createProductAPI = (data) => {
        products.createProduct({
            name,
            price,
            description,
            reducedPrice,
            category,
            brand,
            percentReduced,
            rating,
            inventory,
            priceImport,
            dateImport,
            shop,
            singleFile,
            multipleFile,
            state,
            dispatch,
            data,
            page,
            limit,
            ACgetalls,
        });
    };
    const handleCreate = async () => {
        try {
            await 1;
            requestRefreshToken(
                currentUser,
                createProductAPI,
                state,
                dispatch,
                ACusers
            );
            history(`${routers.qlsp}`);
            // window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    const updateProductAPI = (data, id) => {
        products.updateProduct({
            token: data?.token,
            id,
            ...state.formCreateProduct,
        });
    };
    const handleUpdate = async (id) => {
        try {
            await 1;
            requestRefreshToken(
                currentUser,
                updateProductAPI,
                state,
                dispatch,
                ACusers,
                id
            );
            history(`${routers.qlsp}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={`${cx('container')}`}>
            <div className={`${cx('item-field')}`}>
                <FormInput
                    label='Tên sản phẩm'
                    type='text'
                    placeholder='Nhập tên sản phẩm'
                    name='name'
                    value={name}
                    onChange={handleChangeInput}
                />
                <FormInput
                    label='Giá sản phẩm'
                    type='text'
                    placeholder='Nhập giá sản phẩm'
                    name='price'
                    value={price}
                    onChange={handleChangeInput}
                    className='ml8'
                />
            </div>
            <div className={`${cx('item-field')}`}>
                <TextArea
                    label='Mô tả'
                    name='description'
                    placeholder='Nhập mô tả sản phẩm'
                    value={description}
                    onChange={handleChangeInput}
                />
            </div>
            <div className={`${cx('item-field')}`}>
                <FormInput
                    label='Giá giảm'
                    type='text'
                    placeholder='Nhập giá giảm'
                    name='reducedPrice'
                    value={reducedPrice}
                    onChange={handleChangeInput}
                />
                <FormInput
                    label='Tồn kho'
                    type='text'
                    placeholder='Nhập số lượng tồn kho'
                    name='inventory'
                    className='ml8'
                    value={inventory}
                    onChange={handleChangeInput}
                />
            </div>
            <div className={`${cx('item-field')}`}>
                <SelectOption
                    label='Loại sản phẩm'
                    value={category}
                    isShow={showCategory}
                    onClickShow={handleShowCategory}
                >
                    <div className={`${cx('data-list')}`}>
                        {dataCategory.map((item, index) => (
                            <div
                                className={`${cx('data-item')}`}
                                onClick={() =>
                                    handleChangeSelectCategory(item.label)
                                }
                                key={index}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                </SelectOption>
                <SelectOption
                    label='Nhánh sản phẩm'
                    value={brand}
                    className='ml8'
                    isShow={showBranch}
                    onClickShow={handleShowBranch}
                >
                    <div className={`${cx('data-list')}`}>
                        {dataBranch.map((item, index) => (
                            <div
                                className={`${cx('data-item')}`}
                                onClick={() =>
                                    handleChangeSelectBranch(item.label)
                                }
                                key={index}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                </SelectOption>
            </div>
            <div className={`${cx('item-field')}`}>
                <FormInput
                    label='Phần trăm giảm'
                    type='text'
                    placeholder='Nhập phần trăm giảm (exp: 0.1 → 10%)'
                    name='percentReduced'
                    value={percentReduced}
                    onChange={handleChangeInput}
                />
                <FormInput
                    label='Đánh giá'
                    type='text'
                    placeholder='Nhập đánh giá (1 → 5)'
                    name='rating'
                    value={rating}
                    onChange={handleChangeInput}
                    className='ml8'
                />
            </div>
            <div className={`${cx('item-field')}`}>
                <FormInput
                    label='Giá nhập'
                    type='text'
                    placeholder='Nhập giá nhập sản phẩm'
                    name='priceImport'
                    value={priceImport}
                    onChange={handleChangeInput}
                />
                <FormInput
                    label='Ngày nhập'
                    type='date'
                    name='dateImport'
                    value={dateImport}
                    onChange={handleChangeInput}
                    className='ml8 mt0'
                />
            </div>
            <div className={`${cx('item-field-upload')}`}>
                <label className='label'>Ảnh/Video đầu trang</label>
                <SingleUpload width='100%' />
            </div>
            {/* <div className={`${cx('item-field-upload')}`}>
                <label className='label'>Ảnh/Video sản phẩm</label>
                <MultipleUpload width='100%' />
            </div> */}
            <div className={`${cx('item-field-upload')}`}>
                <SelectOption
                    label='Shop'
                    value={shop}
                    isShow={showShopId}
                    onClickShow={handleShowShopId}
                >
                    <div className={`${cx('data-list')}`}>
                        {dataSelectShop?.map((item, index) => (
                            <div
                                className={`${cx('data-item')}`}
                                onClick={() => handleChangeSelectShop(item.id)}
                                key={index}
                            >
                                {item.label}
                                {item.id && ` - (${item.id} - ${item.address})`}
                            </div>
                        ))}
                    </div>
                </SelectOption>
            </div>
            <div className={`${cx('item-field-upload', 'item-btn-container')}`}>
                <button
                    className={`${cx('btn')} cancelbgc`}
                    onClick={cancelCreate}
                >
                    Cancel
                </button>
                <button
                    className={`${cx('btn')} confirmbgc`}
                    onClick={
                        !dataById
                            ? handleCreate
                            : () => handleUpdate(dataById?._id)
                    }
                >
                    {!dataById ? 'Create' : 'Update'}
                </button>
            </div>
        </div>
    );
}

export default CreateProduct;
