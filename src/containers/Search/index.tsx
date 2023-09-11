import { useState } from 'react';
import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import useRequest from '../../hook/useRequest';
import { ResponseType } from './types';

const defaultRequestData = {
    url: '/hot-search-list.json',
    method: 'GET',
    params: { shopId: '' }
}

const Search = () => {
    const localSearchList = localStorage.getItem('search-list');
    const searchListHistory: string[] = localSearchList ? JSON.parse(localSearchList) : [];

    const [historyList, setHistoryList] = useState(searchListHistory);
    const [keyword, setKeyword] = useState('');

    const params = useParams<{ shopId: string }>();
    if (params.shopId) {
        defaultRequestData.params.shopId = params.shopId
    }

    const { data } = useRequest<ResponseType>(defaultRequestData)
    const hotList = data?.data || []

    const navigate = useNavigate();

    function handleKeyDown(key: string) {
        if (key === 'Enter' && keyword) {
            const newHistoryList = [keyword, ...historyList.filter(item => item !== keyword).slice(0, 19)]
            setHistoryList(newHistoryList);
            localStorage.setItem('search-list', JSON.stringify(newHistoryList));
            navigate(`/searchList/${params.shopId}/${keyword}`);
            setKeyword('');
        }
    }

    function handleHistoryListClean() {
        setHistoryList([]);
        localStorage.setItem('search-list', JSON.stringify([]));
    }

    function handleKeyWordClick(keyword: string) {
        navigate(`/searchList/${params.shopId}/${keyword}`)
    }

    return (
        <div className='page search-page'>
            <div className="search">
                <div className="search-back-icon iconfont search-back-link" onClick={() => navigate(-1)}>&#xe70b;</div>
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
            </div>
            {
                historyList.length ? (
                    <>
                        <div className="title">
                            历史搜索<div
                                className="iconfont title-close"
                                onClick={handleHistoryListClean}
                            >&#xe6a6;</div>
                        </div>
                        <ul className="list">
                            {
                                historyList.map((item, index) => {
                                    return (
                                        <li
                                            className="list-item"
                                            key={index}
                                            onClick={() => handleKeyWordClick(item)}
                                        >{item}</li>
                                    )
                                })
                            }
                        </ul>
                    </>
                ) : null

            }
            {
                hotList?.length ? (
                    <>
                        <div className="title">
                            热门搜索<div className="iconfont title-close"></div>
                        </div>
                        <ul className="list">
                            {
                                hotList?.map(item => {
                                    return <li
                                        className="list-item"
                                        key={item.id}
                                        onClick={() => handleKeyWordClick(item.keyword)}
                                    >{item.keyword}</li>
                                })
                            }
                        </ul>
                    </>
                ) : null
            }


        </div>
    );
}

export default Search;
