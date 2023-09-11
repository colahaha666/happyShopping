import { useState } from 'react';
import useRequest from '../../hook/useRequest';
import './style.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { ResponseType } from './types';

const SearchList = () => {
    const params = useParams<{ shopId: string, keyword: string }>();
    const [keyword, setKeyword] = useState('');
    const [requestData, setRequestData] = useState({
        url: '/shop-search-list.json',
        method: 'GET',
        params: {
            keyword,
            shopId: params.shopId,
            type: 'default'
        }
    })
    const { data } = useRequest<ResponseType>(requestData)
    const list = data?.data;
    const navigate = useNavigate();

    function handleKeyDown(key: string) {
        if (key === 'Enter' && keyword) {
            const newRequestData = { ...requestData }
            newRequestData.params.keyword = keyword
            setRequestData(newRequestData)
        }
    }

    function handleClearKeyword() {
        setKeyword('')
    }

    return (
        <div className='page search-list-page'>
            <div className="search">
                <div className="search-back-icon iconfont" onClick={() => navigate(-1)}>&#xe70b;</div>
                <div className="search-area">
                    <div className="search-icon iconfont">&#xe6e1;</div>
                    <input
                        type="text"
                        className="search-input"
                        placeholder='请输入商品名称'
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        onKeyDown={e => handleKeyDown(e.key)}
                    />
                </div>
                <div className="search-clear iconfont" onClick={handleClearKeyword}>&#xe6a6;</div>
            </div>
            <div className="tab">
                <div className="tab-item tab-item-active">默认</div>
                <div className="tab-item">销量</div>
                <div className="tab-item">价格</div>
            </div>
            <div className="list">
                {
                    list?.map(item => {
                        return (
                            <Link to={`/detail/${item.id}`}>
                                <div className="item" key={item.id}>
                                    <img className='item-img' src={item.imgUrl} alt={item.title} />
                                    <div className="item-content">
                                        <p className="item-title">{item.title}</p>
                                        <div className="item-price">
                                            <span className="item-price-yen">&yen;</span>
                                            {item.price}</div>
                                        <div className="item-sales">已售{item.sales}</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <div className="bottom">
                —— 我是有底线的 ——
            </div>
        </div>
    );
}

export default SearchList;
