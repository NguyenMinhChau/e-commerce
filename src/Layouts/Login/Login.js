import React, { useState } from 'react';
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
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const res = await api.authenPost('login', {
                email,
                password,
            });
            store.setStore({
                id: res.user._id,
                username: res.user.username,
                email: res.user.email,
                phone: res.user?.phone,
                address: res.user?.address,
                role: res.user.role,
                token: res.user.token,
            });
            dispatch(ACusers.setCurrentUser(store.getStore()));
            history(routers.home);
            setIsLoading(false);
        } catch (err) {
            dispatch(ACmessages.setError(err?.response?.data?.message));
            setIsLoading(false);
        }
    };
    return (
        <Form
            titleForm='Login account'
            btnText='Login'
            login
            bolLinkForgotPwd
            bolEmail
            bolPwd
            isLoadingLogin={isLoading}
            className={cx('login')}
            onSubmit={handleSubmit}
        />
    );
}

export default Login;
