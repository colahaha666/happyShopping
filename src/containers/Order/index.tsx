import { useEffect, useState } from 'react';
import useRequest from '../../hook/useRequest';
import './style.scss';
import type { ResponseType, ResponseDataType, AddressItemType, AddressResponseType, PaymentResponseType } from './types';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from '../../utils/message';
import Popover from '../../components/Popover';
import { Picker } from 'antd-mobile';

const Order = () => {
    const navigate = useNavigate()
    const { request } = useRequest<ResponseType>({ manual: true })
    const { request: addressRequest } = useRequest<AddressResponseType>({ manual: true })
    const params = useParams<{ id: string }>()
    const [data, setDate] = useState<ResponseDataType | null>(null);
    const [showAddress, setShowAddress] = useState(false)
    const [addressList, setAddressList] = useState<AddressItemType[]>([])

    const [showTimeRange, setShowTimeRange] = useState(false)
    const [showPayment, setShowPayment] = useState(false)
    const [payWay, setPayWay] = useState('weixin')

    const { request: PaymentRequest } = useRequest<PaymentResponseType>({ manual: true })

    useEffect(() => {
        request({
            url: '/orderDetail.json',
            method: 'GET',
            params: {
                id: params.id
            }
        }).then(response => {
            setDate(response.data)
        }).catch(e => {
            message(e.message)
        })
    }, [request, params])

    useEffect(() => {
        addressRequest({
            url: '/addressList.json',
            method: 'GET',
        }).then(response => {
            setAddressList(response.data)
        }).catch(e => {
            message(e.message)
        })
    }, [addressRequest])

    function handleAddressClick(address: AddressItemType) {
        if (data) {
            const newData = { ...data };
            newData.address = address;
            setDate(newData);
        }
        setShowAddress(false)
    }

    function handleOrderSubmit() {
        const orderId = params.id
        const addressId = data?.address.id
        const time = data?.time
        PaymentRequest({
            url: '/pay.json',
            method: 'POST',
            data: {
                orderId,
                addressId,
                time
            }
        }).then(response => {
            if (response.data) {
                navigate('/home')
            } else {
                message('支付失败')
            }

        }).catch(e => {
            message(e.message)
        })
    }

    return data ? (
        <div className="page order-page">
            <div className="title">确认订单</div>
            <div className="receiver" onClick={() => setShowAddress(true)}>
                <div className="iconfont">&#xe61c;</div>
                <div className="receiver-content">
                    <div className="receiver-name">
                        收货人:  {data.address.name}
                        <span className="receiver-phone">{data.address.phone}</span>
                    </div>
                    <div className="receiver-address">收货人地址: {data.address.address}</div>
                </div>
            </div>
            <div className="delivery" onClick={() => setShowTimeRange(true)}>
                <div className="delivery-text">送达时间</div>
                <div className="delivery-select">{data.time[0]} {data.time[1]}:{data.time[2]}</div>
            </div>
            {
                data.shop.map(shop => {
                    return (
                        <div className="shop" key={shop.shopId}>
                            <div className="shop-title">
                                <span className="iconfont">&#xe639;</span>
                                {shop.shopName}
                            </div>
                            <div className="shop-products">
                                {
                                    shop.cartList.map(product => {
                                        return (
                                            <div className="shop-product" key={product.productId}>
                                                <img src={product.imgUrl} alt={product.title} className='shop-product-img' />
                                                <div className="shop-product-content">
                                                    <div className="shop-product-title">{product.title}</div>
                                                    <div className="shop-product-kilo">{product.weight}</div>
                                                </div>
                                                <div className="shop-product-order">
                                                    <div className="shop-product-price">{product.price}</div>
                                                    <div className="shop-product-count">×{product.count}</div>
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

            <div className="footer">
                <div className="footer-total">
                    合计：<span className="footer-total-price">
                        <span className="footer-total-yen">
                            &yen;
                        </span>
                        199
                    </span>
                </div>
                <div className="footer-submit" onClick={() => setShowPayment(true)}>提交订单</div>
            </div>
            <Popover show={showAddress} blankClickCallback={() => setShowAddress(false)} >
                <div className="address-popover">
                    <div className="address-popover-title">选择地址</div>
                    {
                        addressList.map(address => {
                            return (
                                <div
                                    className="address-item"
                                    key={address.id}
                                    onClick={() => handleAddressClick(address)}
                                >
                                    <div className="address-item-name">
                                        收货人：{address.name}
                                        <span className="address-item-phone">{address.phone}</span>
                                    </div>
                                    <div className="address-item-address">收货人地址：{address.address}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </Popover>
            <Popover show={showPayment} blankClickCallback={() => setShowPayment(false)}>
                <div className="payment-popover">
                    <div className="payment-popover-title">选择地址</div>
                    <div className="payment-popover-price">￥{data.total}</div>
                    <div className="payment-popover-products">
                        <div className="payment-popover-product" onClick={() => setPayWay('weixin')}>
                            <img src="http://statics.dell-lee.com/shopping/weixin.png" alt="微信" className='payment-popover-img' />
                            微信<div className={payWay === 'weixin' ? "radio radio-active" : 'radio'}></div>
                        </div>
                        <div className="payment-popover-product" onClick={() => setPayWay('cash')}>
                            <img src="http://statics.dell-lee.com/shopping/cash.png" alt="余额" className='payment-popover-img' />
                            余额￥{data.money}<div className={payWay === 'cash' ? "radio radio-active" : 'radio'}></div>
                        </div>
                    </div>
                    <div className="payment-popover-button" onClick={handleOrderSubmit}>立即支付</div>
                </div>
            </Popover>
            <Picker
                columns={data.timeRange}
                visible={showTimeRange}
                onClose={() => {
                    setShowTimeRange(false)
                }}
                // value={data.time}
                onConfirm={value => {
                    if (data) {
                        const newData = { ...data };
                        newData.time = value as string[];
                        setDate(newData);
                    }
                    setShowTimeRange(false)
                }}
            />
        </div>
    ) : null
}

export default Order;