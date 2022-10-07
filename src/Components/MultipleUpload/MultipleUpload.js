/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './MultipleUpload.module.css';
import {
    Alert,
    FileCard,
    FileRejectionReason,
    FileUploader,
    majorScale,
    MimeType,
    Pane,
    rebaseFiles,
} from 'evergreen-ui';
import { useAppContext } from '../../utils';
import { ACfiles } from '../../app/';

const cx = className.bind(styles);

function MultipleUpload({ width }) {
    const { dispatch } = useAppContext();
    const acceptedMimeTypes = [
        MimeType.png,
        MimeType.mp3,
        MimeType.mp4,
        MimeType.jpeg,
        MimeType.ico,
        MimeType.gif,
    ];
    const maxFiles = 5;
    const maxSizeInBytes = 50 * 1024 ** 2; // 50 MB
    const [files, setFiles] = React.useState([]);
    const [fileRejections, setFileRejections] = React.useState([]);
    useEffect(() => {
        dispatch(ACfiles.setMultipleFile(files));
    }, [files]);
    const values = React.useMemo(
        () => [
            ...files,
            ...fileRejections.map((fileRejection) => fileRejection.file),
        ],
        [files, fileRejections]
    );
    const handleRemove = React.useCallback(
        (file) => {
            const updatedFiles = files.filter(
                (existingFile) => existingFile !== file
            );
            const updatedFileRejections = fileRejections.filter(
                (fileRejection) => fileRejection.file !== file
            );
            const { accepted, rejected } = rebaseFiles(
                [
                    ...updatedFiles,
                    ...updatedFileRejections.map(
                        (fileRejection) => fileRejection.file
                    ),
                ],
                { acceptedMimeTypes, maxFiles, maxSizeInBytes }
            );

            setFiles(accepted);
            setFileRejections(rejected);
        },
        [acceptedMimeTypes, files, fileRejections, maxFiles, maxSizeInBytes]
    );

    const fileCountOverLimit = files.length + fileRejections.length - maxFiles;
    const fileCountError = `You can upload up to 5 files. Please remove ${fileCountOverLimit} ${
        fileCountOverLimit === 1 ? 'file' : 'files'
    }.`;
    return (
        <div className={`${cx('container')}`}>
            <Pane width={width}>
                <FileUploader
                    acceptedMimeTypes={acceptedMimeTypes}
                    disabled={files.length + fileRejections.length >= maxFiles}
                    maxSizeInBytes={maxSizeInBytes}
                    maxFiles={maxFiles}
                    onAccepted={setFiles}
                    onRejected={setFileRejections}
                    renderFile={(file, index) => {
                        const { name, size, type } = file;
                        const renderFileCountError =
                            index === 0 && fileCountOverLimit > 0;
                        const fileRejection = fileRejections.find(
                            (fileRejection) =>
                                fileRejection.file === file &&
                                fileRejection.reason !==
                                    FileRejectionReason.OverFileLimit
                        );
                        const { message } = fileRejection || {};

                        return (
                            <React.Fragment key={`${file.name}-${index}`}>
                                {renderFileCountError && (
                                    <Alert
                                        intent='danger'
                                        marginBottom={majorScale(2)}
                                        title={fileCountError}
                                    />
                                )}
                                <FileCard
                                    isInvalid={fileRejection != null}
                                    name={name}
                                    onRemove={() => handleRemove(file)}
                                    sizeInBytes={size}
                                    type={type}
                                    validationMessage={message}
                                />
                            </React.Fragment>
                        );
                    }}
                    values={values}
                />
            </Pane>
        </div>
    );
}

export default MultipleUpload;
