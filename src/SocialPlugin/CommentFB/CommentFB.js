import React, { useEffect } from 'react';

function CommentFB({ slug }) {
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, []);
    return (
        <div
            className='fb-comments'
            data-href={`https://www.facebook.com/profile.php?id=100086107495471/comments#configurator/${slug}`}
            data-width='100%'
            data-numposts='5'
        ></div>
    );
}

export default CommentFB;
