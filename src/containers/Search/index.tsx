import { useState } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import useRequest from '../../hook/useRequest';
import { ResponseType } from './types';

const defaultRequestData = {
    url: '/hot-search-list.json',
    method: 'GET',
}

const Search = () => {
    const localSearchList = localStorage.getItem('search-list');
    const searchListHistory: string[] = localSearchList ? JSON.parse(localSearchList) : [];

    const [historyList, setHistoryList] = useState(searchListHistory);
    const [keyword, setKeyword] = useState('');

    const { data } = useRequest<ResponseType>(defaultRequestData)
    const hotList = data?.data || []

    function handleKeyDown(key: string) {
        if (key === 'Enter') {
            // const newHistoryList = [...historyList];
            // newHistoryList.unshift(keyword);
            // if (newHistoryList.length > 2) {
            //     newHistoryList.length = 2;
            // }
            const newHistoryList = [keyword, ...historyList].slice(0, 20);
            setHistoryList(newHistoryList);
            setKeyword('');
            localStorage.setItem('search-list', JSON.stringify(newHistoryList));
        }

    }

    function handleHistoryListClean() {
        setHistoryList([]);
        localStorage.setItem('search-list', JSON.stringify([]));
    }

    return (
        <div className='page search-page'>
            <div className="search">
                <Link to='/home' className='search-back-link'>
                    <div className="search-back-icon iconfont">&#xe70b;</div>
                </Link>
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
                                        <li className="list-item" key={index}>{item}</li>
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
                                    return <li className="list-item" key={item.id}>{item.keyword}</li>
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
