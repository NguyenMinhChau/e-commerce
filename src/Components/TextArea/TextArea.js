import React from 'react';
import className from 'classnames/bind';
import styles from './TextArea.module.css';

const cx = className.bind(styles);

function TextArea({
    label,
    name,
    value,
    classNameTextArea,
    cols = 10,
    rows = 10,
    placeholder,
    onChange,
}) {
    const classed = cx('textarea', classNameTextArea);
    return (
        <div className={`${cx('textarea-container')} mb8`}>
            <label className='label'>{label}</label>
            <textarea
                className={classed}
                name={name}
                cols={cols}
                value={value}
                rows={rows}
                onChange={onChange}
                placeholder={placeholder}
            ></textarea>
        </div>
    );
}

export default TextArea;
