/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import className from 'classnames/bind';
import styles from './Livestream.module.css';
import { Icons } from '../../Components';
import { useAppContext, requestRefreshToken, dates } from '../../utils';
import { ACusers, ACgetalls } from '../../app/';
import { SVaddLive, SVdeleteLive, SVgetAllLive } from '../../services/live';

const cx = className.bind(styles);

function Livestream() {
    const { state, dispatch } = useAppContext();
    const {
        currentUser,
        data: { dataLives },
    } = state;
    const [iframeURL, setIframeURL] = React.useState('');
    const [descVideo, setDescVideo] = React.useState('');
    const refIframe = useRef();
    const refDesc = useRef();
    useEffect(() => {
        SVgetAllLive({
            dispatch,
            ACgetalls,
        });
    }, []);
    const data = dataLives || [];
    const addLiveAPI = (data) => {
        SVaddLive({
            token: data?.token,
            iframeURL: iframeURL,
            descVideo: descVideo,
        });
    };
    const handleChange = (e) => {
        setIframeURL(refIframe.current.value);
        setDescVideo(refDesc.current.value);
    };
    const handleSubmit = async () => {
        try {
            if (!iframeURL) {
                refIframe.current.focus();
            } else if (!descVideo) {
                refDesc.current.focus();
            } else {
                requestRefreshToken(
                    currentUser,
                    addLiveAPI,
                    state,
                    dispatch,
                    ACusers
                );
            }
        } catch (err) {
            console.log(err);
        }
    };
    const deleteAPI = (data, id) => {
        SVdeleteLive({
            token: data?.token,
            id,
        });
    };
    const handleDelete = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                deleteAPI,
                state,
                dispatch,
                ACusers,
                id
            );
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className={`${cx('livestream-container')}`}>
            {currentUser && (
                <div className={`${cx('content-middle-middle')}`}>
                    <input
                        type='text'
                        className={`${cx('input-search')}`}
                        placeholder='<iframe ...></iframe>'
                        value={iframeURL}
                        name='iframeURL'
                        onChange={handleChange}
                        ref={refIframe}
                    />
                    <input
                        type='text'
                        className={`${cx('input-search')}`}
                        placeholder='Mô tả ngắn live'
                        value={descVideo}
                        name='descVideo'
                        onChange={handleChange}
                        ref={refDesc}
                    />
                    <button
                        className={`${cx('button-search')}`}
                        onClick={handleSubmit}
                    >
                        <Icons.UpdateIcon />
                    </button>
                </div>
            )}
            <div className={`${cx('video-container')}`}>
                {data.length > 0 ? (
                    data?.map((item, index) => (
                        <div className={`${cx('video-item')}`} key={index}>
                            <div
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    marginBottom: '8px',
                                    fontStyle: 'italic',
                                }}
                            >
                                <span style={{ color: 'red' }}>
                                    {item?.descVideo}
                                </span>{' '}
                                |{' '}
                                {dates.formatDate(
                                    item?.createdAt,
                                    'DD/MM/YYYY'
                                )}
                                <span
                                    style={{
                                        color: 'red',
                                        marginLeft: '20px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleDelete(item?._id)}
                                >
                                    Delete
                                </span>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: item?.iframeURL,
                                }}
                            ></div>
                        </div>
                    ))
                ) : (
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '16px',
                            color: 'red',
                            width: '100%',
                        }}
                    >
                        Không có livestream nào
                    </div>
                )}
            </div>
        </div>
    );
}

export default Livestream;
