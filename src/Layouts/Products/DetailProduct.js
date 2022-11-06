/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import className from 'classnames/bind';
import { useParams, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { Editor } from '@tinymce/tinymce-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { products, feedbacks } from '../../services';
import { dates, moneys, requestRefreshToken, useAppContext } from '../../utils';
import { ACgetones, ACcarts, ACusers, ACgetalls, ACtoogles } from '../../app/';
import { setCartList } from '../../app/payloads/payloadCart';
import {
    CheckoutPaypal,
    Icons,
    Image,
    ModalConfirm,
    SingleUpload,
} from '../../Components';
import styles from './DetailProducts.module.css';
import { createFeedback, SVdeleteFeedback } from '../../services/feedback';
import routers from '../../Routers/routers';
import {
    CommentFB,
    LikeFB,
    ShareFB,
    ShareLinkedln,
    ShareTelegram,
    ShareTwitter,
} from '../../SocialPlugin';

const cx = className.bind(styles);

function DetailProduct() {
    const { slug, id } = useParams();
    const { state, dispatch } = useAppContext();
    const {
        currentUser,
        singleFile,
        toogleConfirm,
        quantityProduct,
        data: { dataById, dataCartList, dataFeedBacksByIdProduct },
    } = state;
    const [rating, setRating] = useState(0);
    const [idDelete, setIdDelete] = useState(null);
    const [toogleUser, setToogleUser] = useState(false);
    const [toogleAddtoCart, setToogleAddtoCart] = useState(false);
    const [toogleAddtoCartError, setToogleAddtoCartError] = useState(false);
    const inputRef = useRef();
    const history = useNavigate();
    useEffect(() => {
        products.getBySlugProduct({
            data: currentUser,
            slug: id || slug,
            dispatch,
            ACgetones,
        });
    }, []);
    useEffect(() => {
        feedbacks.SVgetFeebackByIdProduct({
            token: currentUser?.token,
            dispatch,
            ACgetalls,
            productId: dataById?.product?._id,
        });
    }, [dataById]);
    const data = dataById?.product || [];
    const dataFeedback = dataFeedBacksByIdProduct || [];
    const handleRating = (e, value) => {
        setRating(value);
    };
    const modalConfirmTrue = (e, id) => {
        e.stopPropagation();
        setIdDelete(id);
        dispatch(ACtoogles.toogleConfirm(true));
    };
    const modalConfirmFalse = (e) => {
        e.stopPropagation();
        dispatch(ACtoogles.toogleConfirm(false));
    };
    const modalToogleUserTrue = (e) => {
        e.stopPropagation();
        setToogleUser(true);
    };
    const modalToogleUserFalse = (e) => {
        e.stopPropagation();
        setToogleUser(false);
    };
    const modalToogleAddtoCartTrue = (e) => {
        e.stopPropagation();
        setToogleAddtoCart(true);
    };
    const modalToogleAddtoCartFalse = (e) => {
        e.stopPropagation();
        setToogleAddtoCart(false);
    };
    const modalToogleAddtoCartErrorTrue = (e) => {
        e.stopPropagation();
        setToogleAddtoCartError(true);
    };
    const modalToogleAddtoCartErrorFalse = (e) => {
        e.stopPropagation();
        setToogleAddtoCartError(false);
    };
    const handleChangeQuantity = (e) => {
        dispatch(ACcarts.setQuantityProduct(e.target.value));
    };
    const handleKeyDown = (e) => {
        if (quantityProduct > data?.inventory) {
            setToogleAddtoCartError(true);
        }
    };
    const handlePlusQuantity = (inventory) => {
        if (parseInt(inputRef.current.value) < parseInt(inventory)) {
            dispatch(
                ACcarts.setQuantityProduct(parseInt(inputRef.current.value) + 1)
            );
        } else {
            dispatch(ACcarts.setQuantityProduct(inventory));
        }
    };
    const handleSubQuantity = () => {
        if (parseInt(inputRef.current.value) > 1) {
            dispatch(
                ACcarts.setQuantityProduct(parseInt(inputRef.current.value) - 1)
            );
        } else {
            dispatch(ACcarts.setQuantityProduct(1));
        }
    };
    const handleAddTocart = () => {
        if (currentUser) {
            if (dataById?.product?.inventory < quantityProduct) {
                setToogleAddtoCartError(true);
            } else {
                if (dataCartList.length === 0) {
                    const data = {
                        userId: currentUser?.id,
                        id: dataById?.product?._id,
                        name: dataById?.product?.name,
                        price: dataById?.product?.price,
                        quantity: quantityProduct,
                        thumbnail: dataById?.product?.thumbnail,
                        description: dataById?.product?.description,
                        brand: dataById?.product?.brand,
                        inventory: dataById?.product?.inventory,
                        sold: dataById?.product?.sold,
                        createdAt: new Date().toISOString(),
                    };
                    dispatch(setCartList([data]));
                    setToogleAddtoCart(true);
                } else {
                    dataCartList.map((item, index) => {
                        if (item.id === dataById?.product?._id) {
                            const data = {
                                userId: currentUser?.id,
                                id: dataById?.product?._id,
                                name: dataById?.product?.name,
                                price: dataById?.product?.price,
                                quantity:
                                    parseInt(item.quantity) +
                                    parseInt(quantityProduct),
                                thumbnail: dataById?.product?.thumbnail,
                                description: dataById?.product?.description,
                                brand: dataById?.product?.brand,
                                inventory: dataById?.product?.inventory,
                                sold: dataById?.product?.sold,
                                createdAt: new Date().toISOString(),
                            };
                            dataCartList.splice(index, 1);
                            dispatch(setCartList([...dataCartList, data]));
                            setToogleAddtoCart(true);
                        } else {
                            const data = {
                                userId: currentUser?.id,
                                id: dataById?.product?._id,
                                name: dataById?.product?.name,
                                price: dataById?.product?.price,
                                quantity: quantityProduct,
                                thumbnail: dataById?.product?.thumbnail,
                                description: dataById?.product?.description,
                                brand: dataById?.product?.brand,
                                inventory: dataById?.product?.inventory,
                                sold: dataById?.product?.sold,
                                createdAt: new Date().toISOString(),
                            };
                            dispatch(setCartList([...dataCartList, data]));
                            setToogleAddtoCart(true);
                        }
                    });
                }
            }
        } else {
            setToogleUser(true);
        }
    };
    const handleBuyNow = () => {
        const data = {
            userId: currentUser?.id,
            id: dataById?.product?._id,
            name: dataById?.product?.name,
            price: dataById?.product?.price,
            quantity: quantityProduct,
            thumbnail: dataById?.product?.thumbnail,
            description: dataById?.product?.description,
            brand: dataById?.product?.brand,
            inventory: dataById?.product?.inventory,
            sold: dataById?.product?.sold,
            createdAt: new Date().toISOString(),
        };
        return data;
    };
    const editorRef = useRef(null);
    const commentAPI = (data) => {
        createFeedback({
            token: data?.token,
            rating,
            content: editorRef.current.getContent(),
            productId: dataById?.product?._id,
            imageList: singleFile[0],
        });
    };
    const handleComment = async () => {
        try {
            if (currentUser) {
                if (editorRef.current || rating) {
                    await 1;
                    requestRefreshToken(
                        currentUser,
                        commentAPI,
                        state,
                        dispatch,
                        ACusers
                    );
                }
            } else {
                setToogleUser(true);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const deleteAPI = (data, id) => {
        SVdeleteFeedback({
            token: data?.token,
            id,
            dispatch,
            ACtoogles,
        });
    };
    const handleDelete = async (id) => {
        try {
            if (currentUser) {
                requestRefreshToken(
                    currentUser,
                    deleteAPI,
                    state,
                    dispatch,
                    ACusers,
                    id
                );
            } else {
                await 1;
                setToogleUser(true);
                dispatch(ACtoogles.toogleConfirm(false));
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className={`${cx('detail-container')}`}>
                <div className={`${cx('detail-left-container')}`}>
                    {data?.thumbnail?.endsWith('.png') ? (
                        <div
                            className={`${cx('image-lagre-container')} mb8`}
                            style={{
                                backgroundImage: `url(${
                                    process.env.REACT_APP_URL_SERVER_IMAGE
                                }${data?.thumbnail?.replace(
                                    'src/uploads',
                                    ''
                                )})`,
                            }}
                        ></div>
                    ) : (
                        <video
                            className={`${cx(
                                'image-lagre-container',
                                'item-video'
                            )} mb8`}
                            src={`${
                                process.env.REACT_APP_URL_SERVER_IMAGE
                            }${data?.thumbnail?.replace('src/uploads', '')}`}
                            controls
                        ></video>
                    )}
                    <div className={`${cx('image-list-container')}`}>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={5}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination, Navigation]}
                            style={{
                                width: '425px',
                                height: '120px',
                            }}
                        >
                            {data?.imagesList?.length > 0 ? (
                                data?.imagesList?.map((item, index) => (
                                    <SwiperSlide
                                        key={index}
                                        className={`${cx(
                                            'image-small',
                                            'active'
                                        )}`}
                                    >
                                        {item?.endsWith('.png') ? (
                                            <div
                                                className={`${cx(
                                                    'image-small-container'
                                                )}`}
                                                style={{
                                                    backgroundImage: `url(${
                                                        process.env
                                                            .REACT_APP_URL_SERVER_IMAGE
                                                    }${item?.replace(
                                                        'src/uploads',
                                                        ''
                                                    )})`,
                                                }}
                                            ></div>
                                        ) : (
                                            <video
                                                className={`${cx(
                                                    'image-small-container',
                                                    'item-video'
                                                )}`}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                                src={`${
                                                    process.env
                                                        .REACT_APP_URL_SERVER_IMAGE
                                                }${item?.replace(
                                                    'src/uploads',
                                                    ''
                                                )}`}
                                                controls
                                            ></video>
                                        )}
                                    </SwiperSlide>
                                ))
                            ) : (
                                <SwiperSlide
                                    className={`${cx('image-small', 'active')}`}
                                >
                                    <div
                                        className={`${cx('image-small')}`}
                                        style={{
                                            backgroundImage: `url('/images/placeholder_images.png')`,
                                        }}
                                    ></div>
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                    <div className={`${cx('actions-container')}`}>
                        <div className={`${cx('action-share')}`}>
                            <div className={`${cx('action-text')}`}>
                                Chia sẻ:{' '}
                            </div>
                            <div
                                className={`${cx(
                                    'actions-icons'
                                )} align-center`}
                            >
                                <ShareFB
                                    slug={data?.slug}
                                    name={data?.name}
                                    desc={data?.description}
                                />
                                <ShareLinkedln
                                    slug={data?.slug}
                                    name={data?.name}
                                    desc={data?.description}
                                />
                                <ShareTwitter
                                    slug={data?.slug}
                                    name={data?.name}
                                    desc={data?.description}
                                />
                                <ShareTelegram
                                    slug={data?.slug}
                                    name={data?.name}
                                    desc={data?.description}
                                />
                            </div>
                        </div>
                        <div className='divider'></div>
                        <div className={`${cx('action-like')}`}>
                            <LikeFB slug={data?.slug} />
                        </div>
                    </div>
                </div>
                <div className={`${cx('detail-right-container')}`}>
                    <div className={`${cx('name-product-container')} mb12`}>
                        <span className={`${cx('badge-product')} mr8`}>
                            Likes
                        </span>
                        <span className={`${cx('name-product')}`}>
                            {data?.name}
                        </span>
                    </div>
                    <div className={`${cx('count-actions-container')} mb12`}>
                        <div className={`${cx('count-ratings')} d-flex mr8`}>
                            <div className={`${cx('count-number')} fz16 mr8`}>
                                {data?.rating}
                            </div>
                            <Rating
                                name='half-rating'
                                value={parseFloat(data?.rating)}
                                precision={0.5}
                                readOnly
                            />
                        </div>
                        <div className='divider'></div>
                        <div className={`${cx('count-comments')} d-flex`}>
                            <div
                                className={`${cx('count-number')} fz16 mr8 ml8`}
                            >
                                {data?.feedback?.length}
                            </div>
                            <div className={`${cx('count-text')} fz16 mr8`}>
                                Comments
                            </div>
                        </div>
                        <div className='divider'></div>
                        <div className={`${cx('count-sells')} d-flex`}>
                            <div
                                className={`${cx('count-number')} fz16 mr8 ml8`}
                            >
                                {data?.sold}
                            </div>
                            <div className={`${cx('count-text')} fz16 mr8`}>
                                Sells
                            </div>
                            <Icons.QuestionIcon
                                className={`${cx('question-icon')}`}
                            />
                        </div>
                    </div>
                    <div className={`${cx('price-container')} mb12`}>
                        <div className={`${cx('price')} fz16 mb12`}>
                            <span>
                                {data?.reducedPrice
                                    ? moneys.VND(data?.reducedPrice) + ' - '
                                    : ''}
                            </span>
                            {/* <span> - </span> */}
                            <span>{moneys.VND(data?.price)}</span>
                        </div>
                        <div className={`${cx('desc-price')}`}>
                            <Icons.SymbolIcon />
                            <div className={`${cx('desc-text-container')} ml8`}>
                                <div className={`${cx('desc-text-top')} mb8`}>
                                    <span className='mr8 fz16'>
                                        Giá đã bao gồm VAT
                                    </span>
                                    <Icons.QuestionIcon />
                                </div>
                                <div
                                    className={`${cx('desc-text-bottom')} fz14`}
                                >
                                    Miễn phí vận chuyển cho đơn hàng trên
                                    200.000đ
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${cx('code-sales-container')} mb12`}>
                        <div className={`${cx('sales-text')} mr8 fz16`}>
                            Code Sales Of Shop
                        </div>
                        <div className={`${cx('code-sales-lists')}`}>
                            <div className={`${cx('code-sales-item')} fz14`}>
                                <span className='mr4'>Sales</span>
                                <sup className='mr2'>vnd</sup>
                                <span className='fz14'>5k</span>
                            </div>
                        </div>
                        <div className={`${cx('code-sales-lists')}`}>
                            <div className={`${cx('code-sales-item')} fz14`}>
                                <span className='mr4'>Sales</span>
                                <sup className='mr2'>vnd</sup>
                                <span className='fz14'>10k</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${cx('ship-container')} mb12`}>
                        <div className={`${cx('ship-text')} fz16 mr30 mb-auto`}>
                            Ship
                        </div>
                        <div className={`${cx('ship-desc-container')}`}>
                            <div className='d-flex align-center'>
                                <Image
                                    src='/images/logo-ship.png'
                                    alt='logo-ship'
                                    className={`${cx('logo-ship')}`}
                                />
                                <div className={`${cx('ship-text')} ml8 fz16`}>
                                    Free Ship
                                </div>
                            </div>
                            <div className='d-flex align-center'>
                                <Icons.ShipAddressIcon />
                                <div className={`${cx('ship-text')} ml8 fz16`}>
                                    Ship To: Ho Chi Minh City
                                </div>
                            </div>
                            <div>
                                <div className={`${cx('ship-text')} fz16 mt4`}>
                                    Fee Ship: 20.000
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${cx('color-product-container')} mb12`}>
                        <div className={`${cx('ship-text')} fz16 mr30`}>
                            Color
                        </div>
                        <div className={`${cx('color-lists')}`}>
                            <div className={`${cx('color-item')} fz16`}>
                                Green
                            </div>
                            <div className={`${cx('color-item')} fz16`}>
                                Red
                            </div>
                            <div className={`${cx('color-item')} fz16`}>
                                Blue
                            </div>
                        </div>
                    </div>
                    <div className={`${cx('color-product-container')} mb12`}>
                        <div className={`${cx('ship-text')} fz16 mr30`}>
                            Sizes
                        </div>
                        <div className={`${cx('color-lists')}`}>
                            <div className={`${cx('color-item')} fz16`}>M</div>
                            <div className={`${cx('color-item')} fz16`}>L</div>
                            <div className={`${cx('color-item')} fz16`}>XL</div>
                        </div>
                    </div>
                    <div className={`${cx('color-product-container')} mb12`}>
                        <div className={`${cx('ship-text')} fz16 mr30`}>
                            Quantity
                        </div>
                        <div className={`${cx('size-container')}`}>
                            <div
                                className={`${cx('sub-product')}`}
                                onClick={handleSubQuantity}
                            >
                                -
                            </div>
                            <div className={`${cx('quantity')}`}>
                                <input
                                    type='text'
                                    name='quantity'
                                    value={quantityProduct}
                                    onChange={handleChangeQuantity}
                                    ref={inputRef}
                                    onKeyUp={handleKeyDown}
                                />
                            </div>
                            <div
                                className={`${cx('plus-product')}`}
                                onClick={() =>
                                    handlePlusQuantity(data?.inventory)
                                }
                            >
                                +
                            </div>
                        </div>
                        <div className={`${cx('')} fz16 ml8`}>
                            {data?.inventory} sản phẩm có sẵn
                        </div>
                    </div>
                    <div className={`${cx('actions-product-container')} mb12`}>
                        <button
                            className={`${cx('btn', 'bgc-opacity')} mr8`}
                            onClick={handleAddTocart}
                        >
                            <div className='flex-center'>
                                <Icons.CartIcons />
                                <span className='fz16 ml8'>
                                    Thêm Vào Giỏ Hàng
                                </span>
                            </div>
                        </button>
                        <CheckoutPaypal dataCartList={[handleBuyNow()]} />
                    </div>
                    <div className={`${cx('secure-container')}`}>
                        <div className='flex-start'>
                            <Image
                                src='/images/secure-logo.png'
                                alt='secure'
                                className={`${cx('secure-logo')}`}
                            />
                            <span className='fz16 ml8'>Mega Mart Đảm Bảo</span>
                            <span className='fz14 ml8'>
                                3 Ngày Trả Hàng / Hoàn Tiền
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${cx('detail-desc-conatiner')}`}>
                <div className={`${cx('detail-desc-title')} align-center`}>
                    Mô tả sản phẩm
                </div>
                <div
                    className={`${cx('detail-desc-content')} fz16`}
                    dangerouslySetInnerHTML={{ __html: data.description }}
                ></div>
            </div>
            <div className={`${cx('detail-feedback-conatiner')}`}>
                <div className='d-flex'>
                    <div className={`${cx('detail-feedback-title')} mr10`}>
                        Phản hồi
                    </div>
                    <div>
                        <Rating
                            name='half-rating'
                            value={parseFloat(rating)}
                            precision={0.5}
                            style={{ fontSize: '22px', marginTop: '-2px' }}
                            onChange={handleRating}
                        />
                    </div>
                </div>
                <div className={`${cx('detail-feedback-content')}`}>
                    <Editor
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue='<p>Hãy cho tôi biết bạn nghĩ gì về sản phẩm?</p>'
                        init={{
                            height: 300,
                            menubar: false,
                            entity_encoding: 'raw',
                            images_upload_url: 'postAcceptor.php',
                            automatic_uploads: false,
                            plugins: [
                                'advlist autolink lists link image media charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                            ],
                            toolbar:
                                'undo redo | formatselect | image | media |' +
                                'bold italic backcolor forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style:
                                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                    />
                    <p className={`${cx('')} fz16 mt12 fwb`}>Ảnh sản phẩm</p>
                    <SingleUpload width='100%' />
                    <div className='flex-end'>
                        <button
                            disabled={!rating}
                            onClick={handleComment}
                            className={`${cx(
                                'btn_feedback',
                                !rating && 'btn_feedback_disabled'
                            )} confirmbgc`}
                        >
                            Bình luận
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${cx('detail-list-feedback-conatiner')}`}>
                <div className={`${cx('detail-list-feedback-title')}`}>
                    Danh sách phản hồi
                </div>
                {dataFeedback.length > 0 && (
                    <div className={`${cx('detail-list-feedback-lists')}`}>
                        {dataFeedback?.map((item, index) => (
                            <div
                                className={`${cx('detail-list-feedback-item')}`}
                                key={index}
                            >
                                <div
                                    className={`${cx(
                                        'detail-list-feedback-item-infouser-conatiner'
                                    )}`}
                                >
                                    <div
                                        className={`${cx(
                                            'detail-list-feedback-item-infouser'
                                        )}`}
                                    >
                                        <Image
                                            src={`${process.env.REACT_APP_URL_SERVER_IMAGE}${item.avatar}`}
                                            alt={item?.user?.username}
                                            className={cx('avatar-user')}
                                        />
                                        <div className='mr8 ml8'>
                                            <div
                                                className={`${cx('name-user')}`}
                                            >
                                                {item?.user?.username} -{' '}
                                                {item?.user?.email}
                                            </div>
                                            <div
                                                className={`${cx(
                                                    'createdAt-container'
                                                )}`}
                                            >
                                                <div
                                                    className={`${cx(
                                                        'createdAt'
                                                    )} mr8`}
                                                >
                                                    {dates.formatDate(
                                                        item.createdAt,
                                                        'DD/MM/YYYY'
                                                    )}
                                                </div>
                                                <Rating
                                                    name='half-rating'
                                                    value={parseFloat(
                                                        item?.rating
                                                    )}
                                                    precision={0.5}
                                                    readOnly
                                                    style={{
                                                        fontSize: '18px',
                                                        marginTop: '-2px',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`${cx('action-container')}`}
                                    >
                                        <div className='complete mr15 underline fwb cr-pointer'>
                                            Edit
                                        </div>
                                        <div
                                            className='cancel underline fwb cr-pointer'
                                            onClick={(e) =>
                                                modalConfirmTrue(e, item?._id)
                                            }
                                        >
                                            Delete
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`${cx(
                                        'detail-list-feedback-item-content'
                                    )}`}
                                >
                                    <Image
                                        src={`${
                                            process.env
                                                .REACT_APP_URL_SERVER_IMAGE
                                        }${item?.imageList[0]?.replace(
                                            'src/uploads',
                                            ''
                                        )}`}
                                        alt='image_product'
                                        className={cx('image-product')}
                                    />
                                    <div
                                        className={`${cx('content-desc')} ml5`}
                                        dangerouslySetInnerHTML={{
                                            __html: item?.content,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <CommentFB slug={data?.slug} />
            {toogleConfirm && (
                <ModalConfirm
                    titleModal='Delete Confirm'
                    open={modalConfirmTrue}
                    close={modalConfirmFalse}
                    textActionMain='Delete'
                    onClick={() => handleDelete(idDelete)}
                >
                    <p className='fz14'>You're sure delete this actions?</p>
                </ModalConfirm>
            )}
            {toogleUser && (
                <ModalConfirm
                    titleModal='Thông báo'
                    open={modalToogleUserTrue}
                    close={modalToogleUserFalse}
                    textActionMain='Đăng nhập'
                    onClick={() => history(routers.login)}
                >
                    <p className='fz14'>
                        Bạn cần đăng nhập để thực hiện chức năng này
                    </p>
                </ModalConfirm>
            )}
            {toogleAddtoCart && (
                <ModalConfirm
                    titleModal='Thông báo'
                    open={modalToogleAddtoCartTrue}
                    close={modalToogleAddtoCartFalse}
                    textActionMain='Đến giỏ hàng'
                    onClick={() => history(routers.cart)}
                >
                    <p className='fz14'>
                        Bạn đã thêm sản phẩm vào giỏ hàng thành công
                    </p>
                </ModalConfirm>
            )}
            {toogleAddtoCartError && (
                <ModalConfirm
                    titleModal='Thông báo'
                    open={modalToogleAddtoCartErrorTrue}
                    close={modalToogleAddtoCartErrorFalse}
                    // textActionMain='Đến giỏ hàng'
                    // onClick={() => history(routers.cart)}
                >
                    <p className='fz14'>
                        Số lượng sản phẩm trong kho không đủ để thêm vào giỏ
                    </p>
                </ModalConfirm>
            )}
        </>
    );
}

export default DetailProduct;
