import { useEffect, useState } from 'react';
import Docker from '../../components/Docker';
import useRequest from '../../hook/useRequest';
import './style.scss'
import type { ProductReponseType, ResponseType } from './types';
import { message } from '../../utils/message';

const Cart = () => {
    const { request } = useRequest<ResponseType>({ manual: true })
    const [cartProducts, setCartProducts] = useState<ProductReponseType>([])
    const [cartList, setCartList] = useState()
    useEffect(() => {
        request({
            url: '/cartProducts.json',
            method: 'GET',
        }).then(data => {
            setProducts(data.data)

        }).catch(e => {
            message(e.message)
        })
    }, [request])

    return (
        <div className='page cart-page'>
            <div className="title">购物车</div>
            <div className="shop">
                <div className="shop-title">
                    <div className="radio"></div>
                    <span className="iconfont">&#xe639;</span>喜梅蔬菜店
                </div>
                <div className="shop-products">
                    {
                        products.map(item => {
                            <div className="shop-product">
                                <div className="radio"></div>
                                <img src="" alt="" className='shop-product-img' />
                                <div className="shop-product-content">
                                    <div className="shop-product-title">潍坊水果萝卜10斤水果萝卜甜脆水果型潍县青沙窝天津萝卜…</div>
                                    <div className="shop-product-kilo">0.45kg</div>
                                    <div className="shop-product-price">
                                        <span className="shop-product-price-yen">&yen;</span>99
                                    </div>
                                    <input type="text" className="shop-product-count" value='3' />
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>
            <div className="total-price">
                <div className="select-all">
                    <div className="radio"></div>
                    <div className="select-all-text">全选</div>
                </div>
                <div className='total'>
                    <span className='total-text'>合计</span>
                    <div className='total-price-inner'>
                        <span className='total-price-inner-yen'>&yen;</span>99
                    </div>
                </div>
                <div className="check">结算(2)</div>
            </div>
            <Docker activeName='购物车' />
        </div>
    )
}

export default Cart;