import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import type { ResponseType } from './types';
import useRequest from '../../hook/useRequest';

const requestData = {
    url: '/detail.json',
    method: 'GET',
    params: { id: '' }
}


const Detail = () => {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    if (params.id) {
        requestData.params.id = params?.id
    }
    const { data } = useRequest<ResponseType>(requestData);
    const result = data?.data

    return (
        <div className='page detail-page'>
            <div className="title">
                <span className="iconfont title-icon" onClick={() => navigate(-1)}>
                    &#xe70b;
                </span>
                商品详情
            </div>
            <img
                className='image'
                src={result?.imgUrl}
                alt={result?.title}
            />
            <div className="main">
                <div className="main-price">
                    <span className="main-price-yen">&yen;</span>{result?.price}
                </div>
                <div className="main-sales">已售{result?.sales}</div>
                <div className="main-content">
                    <div className="main-content-title">
                        {result?.title}
                    </div>
                    <div className="main-content-subtitle">
                        {result?.subtitle}
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
                        <p className="spec-content-item">{result?.origin}</p>
                        <p className="spec-content-item">{result?.specification}</p>
                    </div>
                </div>
            </div>
            <div className="detail">
                <div className="detail-title">商品详情</div>
                <div className="detail-content">
                    {result?.detail}
                </div>
            </div>
            <div className="docker">
                <div className="cart-icon">
                    <div className="iconfont">&#xe8f4;</div>
                    <div className="icon-text">购物车</div>
                </div>
                <div className="cart-button">加入购物车</div>
            </div>
        </div>
    );
}

export default Detail;
