import React from 'react';
import className from 'classnames/bind';
import { FormInput, TextArea, SelectOption } from '../../Components';
import styles from './CreateProduct.css';

const cx = className.bind(styles);

function CreateProduct() {
    return (
        <div className={`${cx('container')}`}>
            <div className={`${cx('item-field')}`}>
                <FormInput
                    label='Tên sản phẩm'
                    type='text'
                    placeholder='Nhập tên sản phẩm'
                    name='name'
                />
                <FormInput
                    label='Giá sản phẩm'
                    type='text'
                    placeholder='Nhập giá sản phẩm'
                    name='price'
                    className='ml8'
                />
            </div>
            <div className={`${cx('item-field')}`}>
                <TextArea
                    label='Mô tả'
                    name='description'
                    placeholder='Nhập mô tả sản phẩm'
                />
            </div>
            <div className={`${cx('item-field')}`}>
                <FormInput
                    label='Giá giảm'
                    type='text'
                    placeholder='Nhập giá giảm'
                    name='reducedPrice'
                />
                <FormInput
                    label='Tồn kho'
                    type='text'
                    placeholder='Nhập số lượng tồn kho'
                    name='inventory'
                    className='ml8'
                />
            </div>
            <div className={`${cx('item-field')}`}>
                <SelectOption label='Loại sản phẩm' />
                <SelectOption label='Nhánh sản phẩm' className='ml8' />
            </div>
            <div className={`${cx('item-field')}`}>
                <FormInput
                    label='Phần trăm giảm'
                    type='text'
                    placeholder='Nhập phần trăm giảm (exp: 0.01 → 10%)'
                    name='percentReduced'
                />
                <FormInput
                    label='Đánh giá'
                    type='text'
                    placeholder='Nhập đánh giá (1 → 5)'
                    name='rating'
                    className='ml8'
                />
            </div>
            <div className={`${cx('item-field')}`}>
                <FormInput
                    label='Giá nhập'
                    type='text'
                    placeholder='Nhập giá nhập sản phẩm'
                    name='priceImport'
                />
                <FormInput
                    label='Ngày nhập'
                    type='date'
                    name='dateImport'
                    className='ml8 mt0'
                />
            </div>
            <div className={`${cx('item-field')}`}>
                <label className='label'>Ảnh đầu trang</label>
            </div>
            <div className={`${cx('item-field')}`}>
                <label className='label'>Ảnh sản phẩm</label>
            </div>
        </div>
    );
}

export default CreateProduct;
