import 'swiper/css';
import './style.scss';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useRequest from '../../hook/useRequest';
import type { ResponseType } from './types';
import { message } from '../../utils/message';

const localLocation = localStorage.getItem('location');
const locationHistory = localLocation ? JSON.parse(localLocation) : null;

const defaultRequestData = {
    url: '/home.json',
    method: 'POST',
    data: {
        latitude: locationHistory ? locationHistory.latitude : 37.7304167,
        longitude: locationHistory ? locationHistory.longitude : -122.384425,
    }
}

const Home = () => {
    const [requestData, setRequestData] = useState(defaultRequestData)
    const { data } = useRequest<ResponseType>(requestData)

    useEffect(() => {
        if (navigator.geolocation && !locationHistory) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                localStorage.setItem('location', JSON.stringify({
                    latitude, longitude
                }));
                setRequestData({
                    ...defaultRequestData, data: {
                        latitude, longitude
                    }
                })
            }, e => {
                message(e.message)
            }, { timeout: 500 });
        }
    }, [])

    const [page, setPage] = useState(1);
    return (
        <div className='page home-page'>
            <div className='banner'>
                <h3 className='location'>
                    <span className='iconfont icon-didian'></span>
                    {data?.data.location.address}
                </h3>
                <div className='search'>
                    <span className='iconfont icon-search'></span>
                    请输入你需要搜索的内容
                </div>
                <div className='swiper-area'>
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        onSlideChange={(e) => setPage(e.activeIndex + 1)}
                    >
                        {
                            (data?.data.banners || []).map(item => {
                                return (
                                    <SwiperSlide key={item.id}>
                                        <div className='swiper-item'>
                                            <img className='swiper-item-img' src={item.url} alt='轮播图' />
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    <div className='pagination'>{page}/{data?.data.banners.length || 0}</div>
                </div>
            </div>
            <div className="category">
                <div className="category-item">
                    <img
                        src="http://statics.dell-lee.com/shopping/category-1.png"
                        alt="新鲜蔬菜"
                        className='category-item-img'
                    />
                    <p className='category-item-desc'>新鲜蔬菜</p>
                </div>
                <div className="category-item">
                    <img
                        src="http://statics.dell-lee.com/shopping/category-1.png"
                        alt="新鲜蔬菜"
                        className='category-item-img'
                    />
                    <p className='category-item-desc'>新鲜蔬菜</p>
                </div>
                <div className="category-item">
                    <img
                        src="http://statics.dell-lee.com/shopping/category-1.png"
                        alt="新鲜蔬菜"
                        className='category-item-img'
                    />
                    <p className='category-item-desc'>新鲜蔬菜</p>
                </div>
                <div className="category-item">
                    <img
                        src="http://statics.dell-lee.com/shopping/category-1.png"
                        alt="新鲜蔬菜"
                        className='category-item-img'
                    />
                    <p className='category-item-desc'>新鲜蔬菜</p>
                </div>
                <div className="category-item">
                    <img
                        src="http://statics.dell-lee.com/shopping/category-1.png"
                        alt="新鲜蔬菜"
                        className='category-item-img'
                    />
                    <p className='category-item-desc'>新鲜蔬菜</p>
                </div>
                <div className="category-item">
                    <img
                        src="http://statics.dell-lee.com/shopping/category-1.png"
                        alt="新鲜蔬菜"
                        className='category-item-img'
                    />
                    <p className='category-item-desc'>新鲜蔬菜</p>
                </div>
                <div className="category-item">
                    <img
                        src="http://statics.dell-lee.com/shopping/category-1.png"
                        alt="新鲜蔬菜"
                        className='category-item-img'
                    />
                    <p className='category-item-desc'>新鲜蔬菜</p>
                </div>
                <div className="category-item">
                    <img
                        src="http://statics.dell-lee.com/shopping/category-1.png"
                        alt="新鲜蔬菜"
                        className='category-item-img'
                    />
                    <p className='category-item-desc'>新鲜蔬菜</p>
                </div>
            </div>
            <div className="card">
                <h3 className='card-title'>
                    <img
                        className='card-title-img'
                        src="http://statics.dell-lee.com/shopping/hot.png"
                        alt="新品尝鲜"
                    />
                    新品尝鲜
                    <div className="card-title-more">
                        更多
                        <span className='iconfont'>
                            &#xe614;
                        </span>
                    </div>
                </h3>
                <div className="card-content">
                    <div className="card-content-item">
                        <img
                            className='card-content-item-img'
                            src="http://statics.dell-lee.com/shopping/hot.png"
                            alt=""
                        />
                        <p className='card-content-item-desc'>金锣 国产猪肉 去皮猪五花肉块 …</p>
                        <p className='card-content-item-price'>
                            <span className='card-content-item-yen'>&yen;</span>
                            66.9
                            <span className="iconfont">&#xe661;</span>
                        </p>
                    </div>
                    <div className="card-content-item">
                        <img
                            className='card-content-item-img'
                            src="http://statics.dell-lee.com/shopping/hot.png"
                            alt=""
                        />
                        <p className='card-content-item-desc'>金锣 国产猪肉 去皮猪五花肉块 …</p>
                        <p className='card-content-item-price'>
                            <span className='card-content-item-yen'>&yen;</span>
                            66.9
                            <span className="iconfont">&#xe661;</span>
                        </p>
                    </div>
                    <div className="card-content-item">
                        <img
                            className='card-content-item-img'
                            src="http://statics.dell-lee.com/shopping/hot.png"
                            alt=""
                        />
                        <p className='card-content-item-desc'>金锣 国产猪肉 去皮猪五花肉块 …</p>
                        <p className='card-content-item-price'>
                            <span className='card-content-item-yen'>&yen;</span>
                            66.9
                            <span className="iconfont">&#xe661;</span>
                        </p>
                    </div>
                    <div className="card-content-item">
                        <img
                            className='card-content-item-img'
                            src="http://statics.dell-lee.com/shopping/hot.png"
                            alt=""
                        />
                        <p className='card-content-item-desc'>金锣 国产猪肉 去皮猪五花肉块 …</p>
                        <p className='card-content-item-price'>
                            <span className='card-content-item-yen'>&yen;</span>
                            66.9
                            <span className="iconfont">&#xe661;</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home;