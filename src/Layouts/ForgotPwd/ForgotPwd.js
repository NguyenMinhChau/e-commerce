import React, { useState } from 'react';
import className from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../utils';
import { ACmessages } from '../../app/';
import { Form } from '../../Components';
import styles from './Forgot.module.css';
import routers from '../../Routers/routers';
import { SVforgotPwd } from '../../services/user';

const cx = className.bind(styles);

function ForgotPwd() {
    const { state, dispatch } = useAppContext();
    const { email } = state.form;
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const res = await SVforgotPwd({
                email,
            });
            if (res.code === 0) {
                dispatch(ACmessages.setSuccess(res?.message));
                setIsLoading(false);
                history(routers.login);
            } else {
                dispatch(ACmessages.setError(res?.message));
                setIsLoading(false);
            }
        } catch (err) {
            dispatch(ACmessages.setError(err?.response?.data?.message));
            setIsLoading(false);
        }
    };
    return (
        <Form
            titleForm='Forgot Password'
            btnText='Send email'
            bolEmail
            bolForgotPwd
            isLoadingForgotPwd={isLoading}
            className={cx('forgot_pwd')}
            onSubmit={handleSubmit}
        />
    );
}

export default ForgotPwd;
