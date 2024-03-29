import React, { useState } from 'react';
import className from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useAppContext, api } from '../../utils';
import { ACmessages } from '../../app/';
import { Form } from '../../Components';
import styles from './Register.module.css';
import routers from '../../Routers/routers';

const cx = className.bind(styles);

function Register() {
    const { state, dispatch } = useAppContext();
    const { username, email, password, phone, address } = state.form;
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const res = await api.authenPost('register', {
                username,
                email,
                password,
                phone,
                address,
            });
            if (res.message) {
                dispatch(ACmessages.setSuccess(res.message));
                history(routers.login);
            }
            setIsLoading(false);
        } catch (err) {
            dispatch(ACmessages.setError(err?.response?.data?.message));
            setIsLoading(false);
        }
    };
    return (
        <Form
            titleForm='Register account'
            btnText='Register'
            register
            bolUsername
            bolEmail
            bolPwd
            bolPhone
            bolAddress
            isLoadingRegister={isLoading}
            className={cx('register')}
            onSubmit={handleSubmit}
        />
    );
}

export default Register;
