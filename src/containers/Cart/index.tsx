import Docker from '../../components/Docker';
import './style.scss'

const Cart = () => {
    return (
        <div className='page cart-page'>
            <div className="title">购物车</div>
            <div className="shop">
                <div className="shop-title">
                    <div className="radio"></div>
                    <span className="iconfont">&#xe639;</span>喜梅蔬菜店
                </div>
                <div className="shop-products">

                </div>
            </div>
            <Docker activeName='购物车' />
        </div>
    )
}

export default Cart;