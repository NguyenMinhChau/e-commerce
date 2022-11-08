import { api } from '../utils';

// GET ALL DOANH THU
export const SVgetallDoanhThu = async (props = {}) => {
    const resGet = await api.tkdoanhthuGet(
        `/getall?page=${props.page}&limit=${props.limit}`,
        {}
    );
    props.dispatch(props.ACgetalls.getDoanhThu(resGet));
};
