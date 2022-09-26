import React, { forwardRef, useState } from 'react';
import className from 'classnames/bind';
import styles from './FormInput.module.css';
import { Icons } from '..';

const cx = className.bind(styles);

const FormInput = forwardRef(
    (
        {
            label,
            type,
            name,
            placeholder,
            showPwd,
            onChange,
            classNameInput,
            className,
        },
        ref
    ) => {
        const [pwd, setPwd] = useState(false);
        const classedInput = cx(
            'input',
            classNameInput,
            showPwd ? 'show-pwd' : ''
        );
        const classed = cx('container', className);
        const handleShowPwd = () => {
            setPwd(!pwd);
        };
        return (
            <div className={classed}>
                {label && <label className={`${cx('label')}`}>{label}</label>}
                <div className={`${cx('input-relative')}`}>
                    <input
                        type={showPwd ? (pwd ? 'text' : 'password') : type}
                        name={name}
                        placeholder={placeholder}
                        onChange={onChange}
                        ref={ref}
                        className={classedInput}
                    />
                    {showPwd && (
                        <span
                            className={`${cx('icon-eye')}`}
                            onClick={handleShowPwd}
                        >
                            {pwd ? (
                                <Icons.EyeShowPwdIcon />
                            ) : (
                                <Icons.EyeHidePwdIcon />
                            )}
                        </span>
                    )}
                </div>
            </div>
        );
    }
);

export default FormInput;
