import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import type { ResponseType, CartResponseType } from './types';
import useRequest from '../../hook/useRequest';
import Popover from '../../components/popover';
import { useEffect, useRef, useState } from 'react';
import { message } from '../../utils/message';
import { CartChangeResponseType } from '../../types';

const Detail = () => {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();

    const [showCart, setShowCart] = useState(false)

    const requestData = useRef({
        url: '/detail.json',
        method: 'GET',
        params: { id: params!.id }
    })
    const { data } = useRequest<ResponseType>(requestData.current);
    const result = data?.data || null

    const [count, setCount] = useState(0)
    const [tempCount, setTempCount] = useState(0)

    const { request: requestCart } = useRequest<CartResponseType>({ manual: true });
    useEffect(() => {
        requestCart({
            url: '/cart.json',
            method: 'GET',
            params: { id: params!.id }
        }).then(response => {
            setCount(response.data.count)
            setTempCount(response.data.count)
        }).catch(e => {
            message(e.message)
        })
    }, [params, requestCart])

    function changeTempCount(count: number) {
        count < 0 ? setTempCount(0) : setTempCount(count)
    }

    function closeMask() {
        setTempCount(count)
        setShowCart(false)
    }

    const { request: cartChangeRequest } = useRequest<CartChangeResponseType>({ manual: true })

    function changeCartInfo() {
        cartChangeRequest({
            url: '/cartCount.json',
            method: 'GET',
            params: { id: params!.id, count: tempCount }
        }).then(() => {
            setShowCart(false)
            setCount(tempCount)
        }).catch(e => {
            message(e.message)
        })
    }

    return result ? (
        <div className='page detail-page'>
            <div className="title">
                <span className="iconfont title-icon" onClick={() => navigate(-1)}>
                    &#xe70b;
                </span>
                商品详情
            </div>
            <img
                className='image'
                src={result.imgUrl}
                alt={result.title}
            />
            <div className="main">
                <div className="main-price">
                    <span className="main-price-yen">&yen;</span>{result.price}
                </div>
                <div className="main-sales">已售{result.sales}</div>
                <div className="main-content">
                    <div className="main-content-title">
                        {result.title}
                    </div>
                    <div className="main-content-subtitle">
                        {result.subtitle}
                    </div>
                </div>
            </div>
            <div className="spec">
                <div className="spec-title">规格信息</div>
                <div className="spec-content">
                    <div className="spec-content-left">
                        <p className="spec-content-item">产地</p>
                        <p className="spec-content-item">规格</p>
                    </div>
                    <div className="spec-content-right">
                        <p className="spec-content-item">{result.origin}</p>
                        <p className="spec-content-item">{result.specification}</p>
                    </div>
                </div>
            </div>
            <div className="detail">
                <div className="detail-title">商品详情</div>
                <div className="detail-content">
                    {result.detail}
                </div>
            </div>
            <div className="docker">
                <div className="cart-icon">
                    <div className="iconfont">
                        &#xe8f4;
                        <span className='icon-count'>{count}</span>
                    </div>
                    <div className="icon-text">购物车</div>
                </div>
                <div className="cart-button" onClick={() => { setShowCart(true) }}>加入购物车</div>
            </div>
            <Popover show={showCart} blankClickCallback={closeMask}>
                <div className="cart">
                    <div className="cart-content">
                        <img className="cart-content-img" src={result.imgUrl} alt='' />
                        <div className="cart-content-info">
                            <div className="cart-content-title">{result.title}</div>
                            <div className="cart-content-price">
                                <span className="cart-content-price-yen">&yen;</span>
                                {result.price}
                            </div>
                        </div>
                    </div>
                    <div className="cart-count">
                        <div className="cart-count-content">
                            购买数量
                            <div className="cart-count-counter">
                                <div className="cart-count-button" onClick={() => changeTempCount(tempCount - 1)}>-</div>
                                <div className="cart-count-text">{tempCount}</div>
                                <div className="cart-count-button" onClick={() => changeTempCount(tempCount + 1)}>+</div>
                            </div>
                        </div>
                    </div>
                    <div className="cart-button" onClick={changeCartInfo}>加入购物车</div>
                </div>
            </Popover>
        </div>
    ) : null;
}

export default Detail;
