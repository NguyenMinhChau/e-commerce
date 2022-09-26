import React from 'react';
import className from 'classnames/bind';
import styles from './SelectOption.module.css';
import { Icons } from '..';

const cx = className.bind(styles);

function SelectOption({ data, label, classNameSelect, className }) {
    const classedSelect = cx('select', classNameSelect);
    const classed = cx('container', className);
    return (
        <div className={`${classed} d-flex flex-column w100 mb8`}>
            <label className='label'>{label}</label>
            <div className={classedSelect}>
                <div className={`${cx('text')}`}>Điện tử</div>
                <Icons.ArrowIcon />
            </div>
        </div>
    );
}

export default SelectOption;
