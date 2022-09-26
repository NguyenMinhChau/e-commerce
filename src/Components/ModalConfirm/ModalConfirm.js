import React from 'react';
import className from 'classnames/bind';
import styles from './ModalConfirm.module.css';
import { Icons } from '..';

const cx = className.bind(styles);

function ModalConfirm({
    titleModal,
    open,
    close,
    onClick,
    children,
    className,
}) {
    const classed = cx('modal-container', className);
    return (
        <div className={classed} onClick={close}>
            <div className='modal-content' onClick={open}>
                <div className='modal-top'>
                    <h3 className='modal-title'>{titleModal}</h3>
                    <div onClick={close}>
                        <Icons.CloseIcon className='cr-pointer' />
                    </div>
                </div>
                <div className={`${cx('divider')}`}></div>
                <div className='modal-middle'>{children}</div>
                <div className='modal-bottom'>
                    <button className='btn confirmbgc' onClick={close}>
                        Cancel
                    </button>
                    <button className='btn cancelbgc' onClick={onClick}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirm;
