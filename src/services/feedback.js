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
// CREATE FEEDBACK
export const createFeedback = async (props = {}) => {
    await api.feedbackPost(
        '/add',
        {
            imageList: props?.imageList,
            content: props?.content,
            rating: props?.rating,
            product: props?.productId,
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                token: props?.token,
            },
        }
    );
    window.location.reload();
};
// GET FEEDBACK BY ID PRODUCT
export const SVgetFeebackByIdProduct = async (props = {}) => {
    const resGet = await api.feedbackGet(`/getByIdProduct/${props.productId}`);
    props.dispatch(props.ACgetalls.getFeedbackByIdProduct(resGet?.feedbacks));
};
// DELETE FEEDBACK
export const SVdeleteFeedback = async (props = {}) => {
    await api.feedbackDelete(`/${props.id}`, {
        headers: {
            token: props?.token,
        },
    });
    props.dispatch(props.ACtoogles.toogleConfirm(false));
    window.location.reload();
};
