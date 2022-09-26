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
    className,
}) {
    const { state, dispatch } = useAppContext();
    const { username, email, password } = state.form;
    const { errorMessage, successMessage } = state;
    const handleChange = (e) => {
        if (e.target.value.charAt(0) === '') {
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
                <Icons.LogoShopee className={`${cx('form-logo')}`} />
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
                <button className={`${cx('form-btn')}`} onClick={onSubmit}>
                    {btnText}
                </button>
                {(login || register) && (
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
                )}
            </div>
        </div>
    );
}

export default Form;
