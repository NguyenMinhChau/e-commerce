/* eslint-disable no-unused-vars */
import { api } from '../utils';

// ADD LIVE
export const SVaddLive = async (props = {}) => {
    const resPost = await api.livePost(
        '/add',
        {
            iframeURL: props?.iframeURL,
            descVideo: props?.descVideo,
        },
        {
            headers: {
                token: props?.token,
            },
        }
    );
    window.location.reload();
};
// GET ALL LIVE
export const SVgetAllLive = async (props = {}) => {
    const resGet = await api.liveGet('/getall');
    props.dispatch(props.ACgetalls.getAllLive(resGet.data));
};
// DELETE LIVE
export const SVdeleteLive = async (props = {}) => {
    const resDelete = await api.liveDelete(`/${props?.id}`, {
        headers: { token: props?.token },
    });
    window.location.reload();
};
