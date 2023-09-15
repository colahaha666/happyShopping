import Docker from '../../components/Docker';
import './style.scss'

const My = () => {

    return (
        <div className='page my-page'>
            <div className="my">
                <div className="title">我的</div>
                <div className="my-info">
                    <img className="my-info-img" src='' alt='' />
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
                    <div className="my-functions-item">
                        <div className="my-functions-item-icon iconfont">&#xe61c;</div>
                        <div className="my-functions-item-text">全部订单</div>
                    </div>
                    <div className="my-functions-item">
                        <div className="my-functions-item-icon iconfont">&#xe61c;</div>
                        <div className="my-functions-item-text">全部订单</div>
                    </div>
                    <div className="my-functions-item">
                        <div className="my-functions-item-icon iconfont">&#xe61c;</div>
                        <div className="my-functions-item-text">全部订单</div>
                    </div>
                    <div className="my-functions-item">
                        <div className="my-functions-item-icon iconfont">&#xe61c;</div>
                        <div className="my-functions-item-text">全部订单</div>
                    </div>
                    <div className="my-functions-item">
                        <div className="my-functions-item-icon iconfont">&#xe61c;</div>
                        <div className="my-functions-item-text">全部订单</div>
                    </div>
                    <div className="my-functions-item">
                        <div className="my-functions-item-icon iconfont">&#xe61c;</div>
                        <div className="my-functions-item-text">全部订单</div>
                    </div>
                    <div className="my-functions-item">
                        <div className="my-functions-item-icon iconfont">&#xe61c;</div>
                        <div className="my-functions-item-text">全部订单</div>
                    </div>
                    <div className="my-functions-item">
                        <div className="my-functions-item-icon iconfont">&#xe61c;</div>
                        <div className="my-functions-item-text">全部订单</div>
                    </div>
                </div>
            </div>
            <Docker activeName='我的'></Docker>
        </div>
    )
}

export default My;