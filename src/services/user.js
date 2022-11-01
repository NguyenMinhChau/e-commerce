/* eslint-disable no-unused-vars */
import { api } from '../utils';
import { userPost } from '../utils/axios/axiosInstance';
// GET ALL USERS
export const getAll = async (props = {}) => {
    const resGet = await api.userGet(
        props.page && props.limit
            ? `/getall?page=${props.page}&limit=${props.limit}`
            : '/getall'
    );
    props.dispatch(props.ACgetalls.getAllUser(resGet));
};

// SEARCH USERS
export const searchUser = (props = {}) => {
    let DATA_FLAG = props.dataUsers?.users;
    if (props.searchVal) {
        DATA_FLAG = DATA_FLAG.filter((user) => {
            return (
                props.texts
                    .lowercase(user.username)
                    .includes(props.texts.lowercase(props.searchVal)) ||
                props.texts
                    .lowercase(user.email)
                    .includes(props.texts.lowercase(props.searchVal)) ||
                props.texts
                    .lowercase(user.role)
                    .includes(props.texts.lowercase(props.searchVal)) ||
                props.texts
                    .lowercase(user.rank)
                    .includes(props.texts.lowercase(props.searchVal))
            );
        });
    }
    return DATA_FLAG;
};
// DELETE USER
export const deleteUser = async (props = {}) => {
    const resDel = await api.userDelete(`/${props.id}`, {
        headers: {
            token: props?.token,
        },
    });
    window.location.reload();
};
// forgot Password
export const SVforgotPwd = async (props = {}) => {
    const resPost = await userPost('/forgotPwd', {
        email: props?.email,
    });
    console.log(resPost);
};
// update user
export const updateUser = async (props = {}) => {
    const resPut = await api.userPut(`/${props.id}`, {
        phone: props?.phone,
        address: props?.address,
        headers: {
            token: props?.token,
        },
    });
    // window.location.reload();
};
