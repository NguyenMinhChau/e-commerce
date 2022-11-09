import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './VerifyAccount.module.css';
import { Form } from '../../Components';
import { useNavigate, useParams } from 'react-router-dom';
import { api, useAppContext } from '../../utils';
import { ACmessages } from '../../app/';
import routers from '../../Routers/routers';

const cx = className.bind(styles);

function VerifyAccount() {
    const { tokenActivation } = useParams();
    const { state, dispatch } = useAppContext();
    const { otpCode } = state.form;
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const res = await api.authenPost(
                `/checkCodeVerify/${tokenActivation}`,
                {
                    otp: otpCode,
                }
            );
            if (res.code === 0) {
                dispatch(ACmessages.setError(''));
                dispatch(ACmessages.setSuccess(res?.message));
                history(routers.login);
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
            const res = await api.authenPost(`/resendCode/${tokenActivation}`);
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
            titleForm='Xác thực tài khoản'
            btnText='Xác thực'
            bolOTP
            isLoadingOTP={isLoading}
            bolForgotPwd
            className={cx('otpCode')}
            onSubmit={handleSubmit}
            onResendCode={handleResendCode}
        />
    );
}

export default VerifyAccount;
