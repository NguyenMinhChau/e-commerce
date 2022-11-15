import React from 'react';
import className from 'classnames/bind';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import styles from './ShareFB.module.css';

const cx = className.bind(styles);

function ShareFB({ slug, name, desc }) {
    // useEffect(() => {
    //     if (window.FB) {
    //         window.FB.XFBML.parse();
    //     }
    // }, []);
    return (
        <div className={`${cx('share-linkedln')} ml8`}>
            <FacebookShareButton
                title={name}
                summary='blabla'
                url={`https://nguyenminhchau.site/products/detail/${slug}`}
            >
                <FacebookIcon style={{ height: '25px', width: '25px' }} />
            </FacebookShareButton>
        </div>
        // <div
        //     style={{ marginTop: '-8px', marginLeft: '5px' }}
        //     className='fb-share-button'
        //     data-href={`https://shopsmallnmc.netlify.app/products/detail/${slug}`}
        //     data-layout='button_count'
        //     data-size='small'
        // >
        //     <Link
        //         target='_blank'
        //         to={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fshopsmallnmc.netlify.app%2Fproducts%2Fdetail%2F${slug}&amp;src=sdkpreparse`}
        //         className='fb-xfbml-parse-ignore'
        //     >
        //         Chia sẻ
        //     </Link>
        // </div>
    );
}

export default ShareFB;
