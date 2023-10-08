import Docker from '../../components/Docker';
import './style.scss'

const icons = [{
    icon: '&#xe601;',
    text: '全部订单',
}, {
    icon: '&#xe629;',
    text: '待付款',
}, {
    icon: '&#xe640;',
    text: '待发货',
}, {
    icon: '&#xe634;',
    text: '待收货',
}, {
    icon: '&#xe6c3;',
    text: '退款/售后',
}, {
    icon: '&#xe649;',
    text: '客服',
}, {
    icon: '&#xe78e;',
    text: '设置',
}, {
    icon: '&#xe61c;',
    text: '地址',
},]

const My = () => {
    return (
        <div className='page my-page'>
            <div className="my">
                <div className="title">我的</div>
                <div className="my-info">
                    <img className="my-info-img" src={require('../../images/头像_@2x.png')} alt='' />
                    <div className="my-info-name">王翠花</div>
                    <div className="my-info-icon">VIP5</div>
                    <div className="my-info-button">会员中心</div>
                </div>
                <div className="my-credits">
                    <div className="my-credits-discount">
                        <div className="my-credits-discount-num">4</div>
                        <div className="my-credits-discount-text">优惠券</div>
                    </div>
                    <div className="my-credits-credit">
                        <div className="my-credits-credit-num">258</div>
                        <div className="my-credits-credit-text">积分</div>
                    </div>
                </div>
                <div className="my-functions">
                    {icons.map(item => {
                        return (
                            <div className="my-functions-item" key={item.icon}>
                                <div className="my-functions-item-icon iconfont" dangerouslySetInnerHTML={{ __html: item.icon }}></div>
                                <div className="my-functions-item-text">{item.text}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Docker activeName='我的'></Docker>
        </div>
    )
}

export default My;