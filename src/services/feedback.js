import { api } from '../utils';

// GET ALL FEEDBACKS
export const getAllFeedback = async (props = {}) => {
    const resGet = await api.feedbackGet(
        `/getall?page=${props.page}&limit=${props.limit}`,
        {
            token: props?.data?.token,
        }
    );
    props.dispatch(props.ACgetalls.getAllFeedback(resGet));
};
