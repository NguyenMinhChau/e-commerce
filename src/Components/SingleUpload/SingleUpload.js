/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import className from 'classnames/bind';
import { Pane, FileUploader, FileCard, MimeType } from 'evergreen-ui';
import { useAppContext } from '../../utils';
import { ACfiles } from '../../app/';
import styles from './SingleUpload.module.css';

const cx = className.bind(styles);

function SingleUpload({ width }) {
    const { state, dispatch } = useAppContext();
    const {
        singleFile,
        data: { dataById },
    } = state;
    const [fileRejections, setFileRejections] = React.useState([]);
    const acceptedMimeTypes = [
        MimeType.png,
        MimeType.mp3,
        MimeType.mp4,
        MimeType.jpeg,
        MimeType.ico,
        MimeType.gif,
    ];
    const handleChange = React.useCallback(
        (files) => dispatch(ACfiles.setSingleFile([files[0]])),
        []
    );
    const handleRejected = React.useCallback(
        (fileRejections) => setFileRejections([fileRejections[0]]),
        []
    );
    const handleRemove = React.useCallback(() => {
        dispatch(ACfiles.setSingleFile([]));
        setFileRejections([]);
    }, []);
    return (
        <div className={`${cx('container')}`}>
            <Pane width={width}>
                <FileUploader
                    acceptedMimeTypes={acceptedMimeTypes}
                    maxSizeInBytes={50 * 1024 ** 2}
                    maxFiles={1}
                    onChange={handleChange}
                    onRejected={handleRejected}
                    renderFile={(file) => {
                        const { name, size, type } = file;
                        const fileRejection = fileRejections.find(
                            (fileRejection) => fileRejection.file === file
                        );
                        const { message } = fileRejection || {};
                        return (
                            <FileCard
                                key={name}
                                isInvalid={fileRejection != null}
                                name={
                                    dataById?.thumbnail?.replace(
                                        '/images/products/',
                                        ''
                                    ) || name
                                }
                                onRemove={handleRemove}
                                sizeInBytes={size || 20000}
                                type={type}
                                validationMessage={message}
                            />
                        );
                    }}
                    values={singleFile}
                />
            </Pane>
        </div>
    );
}

export default SingleUpload;
