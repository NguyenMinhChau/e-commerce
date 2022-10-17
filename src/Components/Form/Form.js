import React from 'react';
import className from 'classnames/bind';
import Alert from '@mui/material/Alert';
import { useAppContext } from '../../utils';
import { ACforms } from '../../app/';
import styles from './Form.module.css';
import { Icons, FormInput } from '..';
import { Link } from 'react-router-dom';
import routers from '../../Routers/routers';

const cx = className.bind(styles);

function Form({
    titleForm,
    btnText,
    onSubmit,
    login,
    register,
    bolEmail,
    bolPwd,
    bolUsername,
    bolPhone,
    bolAddress,
    bolForgotPwd,
    bolOTP,
    bolLinkForgotPwd,
    className,
    isLoadingLogin,
    isLoadingRegister,
    isLoadingOTP,
    isLoadingForgotPwd,
}) {
    const { state, dispatch } = useAppContext();
    const { username, email, password, phone, address, otpCode } = state.form;
    const { errorMessage, successMessage } = state;
    const handleChange = (e) => {
        if (e.target.value.startsWith() === '') {
            return;
        } else {
            dispatch(
                ACforms.setFormValue({
                    ...state.form,
                    [e.target.name]: e.target.value,
                })
            );
        }
    };
    const classed = cx('container', className);
    return (
        <div className={classed}>
            <div className={`${cx('form-container')}`}>
                <Link to={routers.home}>
                    <Icons.LogoShop className={`${cx('form-logo')}`} />
                </Link>
                <div className={`${cx('form-title')}`}>{titleForm}</div>
                {(errorMessage || successMessage) && (
                    <Alert
                        severity={successMessage ? 'success' : 'error'}
                        className='alert'
                    >
                        {errorMessage || successMessage}
                    </Alert>
                )}
                {bolUsername && (
                    <FormInput
                        label='username'
                        name='username'
                        value={username}
                        type='text'
                        placeholder='Enter your username'
                        onChange={handleChange}
                    />
                )}
                {bolEmail && (
                    <FormInput
                        label='email'
                        name='email'
                        value={email}
                        type='text'
                        placeholder='Enter your email address'
                        onChange={handleChange}
                    />
                )}
                {bolOTP && (
                    <FormInput
                        label='OTP'
                        name='otpCode'
                        value={otpCode}
                        type='text'
                        placeholder='Enter your OTP code'
                        onChange={handleChange}
                    />
                )}
                {bolPwd && (
                    <FormInput
                        label='password'
                        name='password'
                        value={password}
                        type='password'
                        placeholder='Enter your password'
                        showPwd
                        onChange={handleChange}
                    />
                )}
                {bolPhone && (
                    <FormInput
                        label='phone'
                        name='phone'
                        value={phone}
                        type='text'
                        placeholder='Enter your phone number'
                        onChange={handleChange}
                    />
                )}
                {bolAddress && (
                    <FormInput
                        label='address'
                        name='address'
                        value={address}
                        type='text'
                        placeholder='Enter your address'
                        onChange={handleChange}
                    />
                )}
                <button className={`${cx('form-btn')}`} onClick={onSubmit}>
                    {isLoadingLogin ||
                    isLoadingRegister ||
                    isLoadingOTP ||
                    isLoadingForgotPwd ? (
                        <span className={`${cx('loader')}`}></span>
                    ) : (
                        btnText
                    )}
                </button>
                {(login || register) && (
                    <>
                        <span className={`${cx('form-desc')}`}>
                            <span className={`${cx('form-text')}`}>
                                {login
                                    ? "You dont't account?"
                                    : 'You have an account?'}
                            </span>
                            <Link
                                to={login ? routers.register : routers.login}
                                className={`${cx('form-link')}`}
                            >
                                {login ? 'Register' : 'Login'}
                            </Link>
                        </span>
                        {bolLinkForgotPwd && (
                            <span className={`${cx('form-desc')} mt12`}>
                                <span className={`${cx('form-text')}`}>
                                    Forgot
                                </span>
                                <Link
                                    to={routers.forgotPwd}
                                    className={`${cx('form-link')}`}
                                >
                                    Password?
                                </Link>
                            </span>
                        )}
                    </>
                )}
                {bolForgotPwd && (
                    <>
                        <span className={`${cx('form-desc')}`}>
                            <span className={`${cx('form-text')}`}>
                                You dont't account?
                            </span>
                            <Link
                                to={routers.register}
                                className={`${cx('form-link')}`}
                            >
                                Register
                            </Link>
                        </span>
                        <span className={`${cx('form-desc')} mt12`}>
                            <span className={`${cx('form-text')}`}>
                                You have an account?
                            </span>
                            <Link
                                to={routers.login}
                                className={`${cx('form-link')}`}
                            >
                                Login
                            </Link>
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}

export default Form;
