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
            data-href={`https://shopsmallnmc.netlify.app/products/detail/${slug}`}
            data-width=''
            data-layout='button'
            data-action='like'
            data-size='small'
            data-share='false'
        ></div>
    );
}

export default LikeFB;
