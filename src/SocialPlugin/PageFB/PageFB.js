import React, { useEffect } from 'react';

function PageFB() {
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, []);
    return (
        <div
            class='fb-page'
            data-href='https://www.facebook.com/profile.php?id=100086107495471'
            data-tabs='timeline'
            data-width=''
            data-height='350'
            data-small-header='false'
            data-adapt-container-width='true'
            data-hide-cover='false'
            data-show-facepile='true'
        >
            <blockquote
                cite='https://www.facebook.com/profile.php?id=100086107495471'
                class='fb-xfbml-parse-ignore'
            >
                <a href='https://www.facebook.com/profile.php?id=100086107495471'>
                    Facebook
                </a>
            </blockquote>
        </div>

        // <div
        //     className='fb-page'
        //     data-href='https://www.facebook.com/profile.php?id=100086107495471'
        //     data-tabs='timeline'
        //     data-width=''
        //     data-height=''
        //     data-small-header='false'
        //     data-adapt-container-width='true'
        //     data-hide-cover='false'
        //     data-show-facepile='true'
        // >
        //     <blockquote
        //         cite='https://www.facebook.com/profile.php?id=100086107495471'
        //         className='fb-xfbml-parse-ignore'
        //     >
        //         <a href='https://www.facebook.com/profile.php?id=100086107495471'>
        //             Mega Mart
        //         </a>
        //     </blockquote>
        // </div>
    );
}

export default PageFB;
