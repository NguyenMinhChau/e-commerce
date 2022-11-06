import React, { useEffect } from 'react';

function LikeFB({ slug }) {
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, []);
    return (
        <div
            className='fb-like'
            data-href={`${process.env.REACT_APP_URL_SERVER_IMAGE}/products/detail/${slug}`}
            data-width=''
            data-layout='button'
            data-action='like'
            data-size='small'
            data-share='false'
        ></div>
    );
}

export default LikeFB;
