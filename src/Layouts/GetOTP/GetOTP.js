import React, { useState } from 'react';
import className from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../utils';
import { ACmessages } from '../../app/';
import { Form } from '../../Components';
import styles from './GetOTP.module.css';
import routers from '../../Routers/routers';
import { userPut } from '../../utils/axios/axiosInstance';

const cx = className.bind(styles);

function GetOTP() {
    const { token } = useParams();
    const { state, dispatch } = useAppContext();
    const { otpCode, password } = state.form;
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const res = await userPut(`/getOTP/${token}`, {
                otp: otpCode,
                pwd: password,
            });
            if (res.code === 0) {
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
    return (
        <Form
            titleForm='Cập nhật mật khẩu'
            btnText='Cập nhật'
            bolOTP
            bolPwd
            isLoadingOTP={isLoading}
            bolForgotPwd
            className={cx('otpCode')}
            onSubmit={handleSubmit}
        />
    );
}

export default GetOTP;
