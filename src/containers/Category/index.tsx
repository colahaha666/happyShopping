import { useEffect, useState } from 'react';
import useRequest from '../../hook/useRequest';
import './style.scss';
import { CategoryAndTagResponseType, ProductResponseType, ProductType } from './types';
import { message } from '../../utils/message';

const Category = () => {
    const [products, setProducts] = useState<Array<ProductType>>([])
    const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
    const [tags, setTags] = useState<string[]>([]);
    const [keyword, setKeyword] = useState('');

    const [productRequestData, setProductRequestData] = useState({
        url: '/category-search-list.json',
        method: 'POST',
        data: {
            tag: '',
            keyword: '',
            category: ''
        }
    })
    const { request } = useRequest<CategoryAndTagResponseType>({ manual: true });
    const { request: productRequest } = useRequest<ProductResponseType>({ manual: true });
    useEffect(() => {
        request({
            url: '/category-list.json',
            method: 'GET',
        }).then(data => {
            if (data?.success) {
                const result = data.data;
                setCategories(result.category)
                setTags(result.tag)
            }
        }).catch(e => {
            message(e?.message)
        })
    }, [request])

    useEffect(() => {
        productRequest({
            url: '/category-search-list.json',
            method: 'POST',
            data: {
                tag: '',
                keyword,
                category: ''
            }
        }).then(data => {
            if (data?.success) {
                const result = data.data;
                setProducts(result)
            }
        }).catch(e => {
            message(e?.message)
        })
    }, [productRequest, keyword])

    function handleKeyDown(key: string, target: any) {
        if (key === 'Enter') {
            setKeyword(target.value)
        }
    }

    return (
        <div className='page category-page'>
            <div className="title">
                分类
            </div>
            <div className="search">
                <div className="search-area">
                    <div className="search-icon iconfont">&#xe6e1;</div>
                    <input
                        type="text"
                        className="search-input"
                        placeholder='请输入商品名称'
                        onKeyDown={e => handleKeyDown(e.key, e.target)}
                    />
                </div>
            </div>
            <div className="category">
                <div className="category-item category-item-active">全部商品</div>
                {
                    (categories || []).map(item => {
                        return (
                            <div className="category-item" key={item.id}>{item.name}</div>
                        )
                    })
                }
            </div>
            <div className="tag">
                <div className="tag-item tag-item-active">全部</div>
                {
                    tags.map((item, index) => {
                        return (
                            <div className="tag-item" key={item + index}>{item}</div>
                        )
                    })
                }
            </div>
            <div className="product">
                <div className="product-title">精选商品（{products.length}）</div>
                {
                    products.map(item => {
                        return (
                            <div className="product-item" key={item.id}>
                                <img
                                    className="product-item-img"
                                    src={item.imgUrl}
                                    alt={item.title}
                                />
                                <div className="product-item-content">
                                    <div className="product-item-title">{item.title}</div>
                                    <div className="product-item-sales">月售{item.sales}</div>
                                    <div className="product-item-price">
                                        <span className="product-item-price-yen">&yen;</span>{item.price}
                                    </div>
                                    <div className="product-item-button">购买</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="docker">
                <div className="docker-item">
                    <p className='iconfont docker-item-icon'>&#xe604;</p>
                    <p className='docker-ite-title'>首页</p>
                </div>
                <div className="docker-item">
                    <p className='iconfont docker-item-icon docker-item-active'>&#xe60d;</p>
                    <p className='docker-ite-title'>分类</p>
                </div>
                <div className="docker-item">
                    <p className='iconfont docker-item-icon'>&#xe600;</p>
                    <p className='docker-ite-title'>购物车</p>
                </div>
                <div className="docker-item">
                    <p className='iconfont docker-item-icon'>&#xe61c;</p>
                    <p className='docker-ite-title'>我的</p>
                </div>
            </div>
        </div>
    );
}

export default Category;
