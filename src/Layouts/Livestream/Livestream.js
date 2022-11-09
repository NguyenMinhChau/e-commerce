/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import className from 'classnames/bind';
import styles from './Livestream.module.css';
import { FormInput, Icons } from '../../Components';
import { useAppContext, requestRefreshToken, dates } from '../../utils';
import { ACusers, ACgetalls, ACsearchs } from '../../app/';
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
    const [search, setSearch] = useState(null);
    const refIframe = useRef();
    const refDesc = useRef();
    useEffect(() => {
        SVgetAllLive({
            dispatch,
            ACgetalls,
        });
    }, []);
    let data = dataLives || [];
    if (search) {
        data = data.filter((item) =>
            item.descVideo.toLowerCase().includes(search.toLowerCase())
        );
    }
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
    const handleChangeSearch = (e) => {
        if (e.target.value.startsWith(' ')) {
            return;
        } else {
            setSearch(e.target.value);
        }
    };
    // const video cuối
    const lastVideo = data[data.length - 1];
    // các video còn lại
    const otherVideos = data.slice(0, data.length - 1);
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
                        className={`${cx('input-search')} pr18`}
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
            <p className='fz16 fwb'>Tìm kiếm</p>
            <div>
                <FormInput
                    type='text'
                    name='search'
                    placeholder='Tìm kiếm live...'
                    classNameInput={`${cx('input')}`}
                    onChange={handleChangeSearch}
                />
            </div>
            <div className={`${cx('video-container')}`}>
                {data.length > 0 ? (
                    <div className={`${cx('video-container')}`}>
                        <div
                            className={`${cx(
                                'video-isShowing',
                                'video-item'
                            )} mb12`}
                        >
                            <p className={`${cx('video-title')} complete`}>
                                {search
                                    ? `Kết quả tìm kiếm cho LiveStreams: ${search}`
                                    : 'LiveStreams đang công chiếu'}
                            </p>
                            <div className={`${cx('video-item')}`}>
                                <div
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        marginBottom: '8px',
                                        fontStyle: 'italic',
                                        lineHeight: '1.5',
                                    }}
                                >
                                    <span style={{ color: 'red' }}>
                                        {lastVideo?.descVideo}
                                    </span>{' '}
                                    |{' '}
                                    {dates.formatDate(
                                        lastVideo?.createdAt,
                                        'DD/MM/YYYY'
                                    )}
                                    <span
                                        style={{
                                            color: 'red',
                                            marginLeft: '20px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() =>
                                            handleDelete(lastVideo?._id)
                                        }
                                    >
                                        Delete
                                    </span>
                                </div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: lastVideo?.iframeURL,
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div
                            className={`${cx('video-premiered', 'video-item')}`}
                        >
                            <p className={`${cx('video-title')} cancel`}>
                                LiveStreams đã công chiếu
                            </p>
                            {otherVideos.length > 0 ? (
                                otherVideos?.map((item, index) => (
                                    <div
                                        className={`${cx('video-item')}`}
                                        key={index}
                                    >
                                        <div
                                            style={{
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                marginBottom: '8px',
                                                fontStyle: 'italic',
                                                lineHeight: '1.5',
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
                                                onClick={() =>
                                                    handleDelete(item?._id)
                                                }
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
                                <div className='w100 text-center fz16 mt12'>
                                    <p className='cancel'>
                                        Chưa có video nào được công chiếu
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '16px',
                            color: 'red',
                            width: '100%',
                        }}
                    >
                        {search
                            ? `Không có LiveStreams nào phù hợp với ${search}`
                            : 'Không có livestream nào'}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Livestream;
