import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './SendMailReVerify.module.css';
import { Form } from '../../Components';
import { api, useAppContext } from '../../utils';
import { ACmessages } from '../../app/';

const cx = className.bind(styles);

function SendMailReVerify() {
    const { state, dispatch } = useAppContext();
    const { email } = state.form;
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const res = await api.authenPost('/sendMailVerify', {
                email,
            });
            if (res.code === 0) {
                dispatch(ACmessages.setError(''));
                dispatch(ACmessages.setSuccess(res?.message));
            } else {
                dispatch(ACmessages.setError(res?.message));
            }
            setIsLoading(false);
        } catch (err) {
            dispatch(ACmessages.setError(err?.response?.data?.message));
            setIsLoading(false);
        }
    };
    const handleResendCode = async () => {
        try {
            const res = await api.authenPost(`/resendCode/`);
            if (res.code === 0) {
                dispatch(ACmessages.setSuccess(res?.message));
            } else {
                dispatch(ACmessages.setError(res?.message));
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Form
            titleForm='Send email verify account'
            btnText='Send email'
            bolEmail
            isLoadingOTP={isLoading}
            bolForgotPwd
            className={cx('otpCode')}
            onSubmit={handleSubmit}
            onResendCode={handleResendCode}
        />
    );
}

export default SendMailReVerify;
