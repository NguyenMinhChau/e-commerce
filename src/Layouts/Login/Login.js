import React from 'react';
import className from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useAppContext, api, store } from '../../utils';
import { ACmessages, ACusers } from '../../app/';
import { Form } from '../../Components';
import styles from './Login.module.css';
import routers from '../../Routers/routers';

const cx = className.bind(styles);

function Login() {
    const { state, dispatch } = useAppContext();
    const { email, password } = state.form;
    const history = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await api.authenPost('login', {
                email,
                password,
            });
            store.setStore({
                username: res.user.username,
                role: res.user.role,
                token: res.user.token,
            });
            dispatch(ACusers.setCurrentUser(store.getStore()));
            history(routers.home);
        } catch (err) {
            dispatch(ACmessages.setError(err?.response?.data?.message));
        }
    };
    return (
        <Form
            titleForm='Login account'
            btnText='Login'
            login
            bolEmail
            bolPwd
            className={cx('login')}
            onSubmit={handleSubmit}
        />
    );
}

export default Login;
