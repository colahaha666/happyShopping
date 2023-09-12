import { useEffect, useState } from 'react';
import useRequest from '../../hook/useRequest';
import './style.scss';
import { CategoryAndTagResponseType, ProductResponseType, ProductType } from './types';
import { message } from '../../utils/message';
import Docker from '../../components/Docker';

const Category = () => {
    const [products, setProducts] = useState<Array<ProductType>>([])
    const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
    const [tags, setTags] = useState<string[]>([]);
    const [keyword, setKeyword] = useState('');

    const [currentCategory, setCurrentCategory] = useState('');
    const [currentTag, setCurrentTag] = useState('');

    const { request: tagRequest } = useRequest<CategoryAndTagResponseType>({ manual: true });
    const { request: productRequest } = useRequest<ProductResponseType>({ manual: true });
    useEffect(() => {
        tagRequest({
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
    }, [tagRequest])

    useEffect(() => {
        productRequest({
            url: '/category-search-list.json',
            method: 'POST',
            data: {
                tag: currentTag,
                keyword,
                category: currentCategory
            }
        }).then(data => {
            if (data?.success) {
                const result = data.data;
                setProducts(result)
            }
        }).catch(e => {
            message(e?.message)
        })
    }, [productRequest, keyword, currentTag, currentCategory])

    function handleKeyDown(key: string, target: EventTarget & HTMLInputElement) {
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
                        onKeyDown={e => handleKeyDown(e.key, e.currentTarget)}
                    />
                </div>
            </div>
            <div className="category">
                <div
                    className={currentCategory === '' ? 'category-item category-item-active' : 'category-item'}
                    onClick={() => setCurrentCategory('')}
                >全部商品</div>
                {
                    (categories || []).map(item => {
                        return (
                            <div
                                className={currentCategory === item.id ? 'category-item category-item-active' : 'category-item'}
                                key={item.id}
                                onClick={() => setCurrentCategory(item.id)}
                            >{item.name}</div>
                        )
                    })
                }
            </div>
            <div className="tag">
                <div
                    className={currentTag === '' ? 'tag-item tag-item-active' : 'tag-item'}
                    onClick={() => setCurrentTag('')}
                >全部</div>
                {
                    tags.map((item, index) => {
                        return (
                            <div
                                className={currentTag === item ? 'tag-item tag-item-active' : 'tag-item'}
                                key={item + index}
                                onClick={() => setCurrentTag(item)}
                            >{item}</div>
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

            <Docker activeName='分类'></Docker>
        </div>
    );
}

export default Category;
