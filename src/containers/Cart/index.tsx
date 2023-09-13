import { useEffect, useState } from 'react';
import Docker from '../../components/Docker';
import useRequest from '../../hook/useRequest';
import './style.scss'
import type { ListItemType, ResponseType } from './types';
import { message } from '../../utils/message';

const Cart = () => {
    const [list, setList] = useState<ListItemType[]>([])
    const { request } = useRequest<ResponseType>({ manual: true });
    useEffect(() => {
        request({
            url: '/cartProducts.json',
            method: 'GET',
        }).then((data) => {
            const list = data.data;
            const newList = list.map(shop => {
                const newCartList = shop.cartList.map(product => {
                    return { ...product, selected: false }
                })
                return { shopId: shop.shopId, shopName: shop.shopName, cartList: newCartList }
            })
            setList(newList);

        }).catch(e => {
            message(e.message);
        })
    }, [request])

    function handleCountChange(shopId: string, productId: string, count: string) {
        const newList = [...list];
        const shop = newList.find(shop => shop.shopId === shopId)
        shop?.cartList.forEach(product => {
            if (product.productId === productId) {
                product.count = Number.isNaN(+count) ? 0 : +count;
            }
        })

        setList(newList)
    }

    return (
        <div className='page cart-page'>
            <div className="title">购物车</div>
            {
                list.map(shop => {
                    return (
                        <div className="shop" key={shop.shopId}>
                            <div className="shop-title">
                                <div className="radio"></div>
                                <span className="iconfont">&#xe639;</span>{shop.shopName}
                            </div>
                            <div className="shop-products">
                                {
                                    shop.cartList.map(product => {
                                        return (
                                            <div className="shop-product" key={product.productId}>
                                                <div className="radio"></div>
                                                <img src={product.imgUrl} alt={product.title} className='shop-product-img' />
                                                <div className="shop-product-content">
                                                    <div className="shop-product-title">{product.title}</div>
                                                    <div className="shop-product-kilo">{product.weight}</div>
                                                    <div className="shop-product-price">
                                                        <span className="shop-product-price-yen">&yen;</span>{product.price}
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="shop-product-count"
                                                        value={product.count}
                                                        onChange={e => handleCountChange(shop.shopId, product.productId, e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }

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