import React from 'react';
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
    const { username, email, password } = state.form;
    const history = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await api.authenPost('register', {
                username,
                email,
                password,
            });
            if (res.message) {
                dispatch(ACmessages.setSuccess(res.message));
                history(routers.login);
            }
        } catch (err) {
            dispatch(ACmessages.setError(err?.response?.data?.message));
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
            className={cx('register')}
            onSubmit={handleSubmit}
        />
    );
}

export default Register;
