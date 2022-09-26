import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import styles from './Image.module.css';

const cx = className.bind(styles);

function Image({ src, alt, errorImage, className }) {
    const classed = cx('image', className);
    return (
        <img
            src={src}
            alt={alt}
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = errorImage
                    ? errorImage
                    : '/svgs/imagePlaceholder.svg';
            }}
            className={classed}
        />
    );
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    errorImage: PropTypes.string,
    className: PropTypes.string,
};

export default Image;
