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
                    <span className='iconfont'>&#xe61c;</span>
                    {data?.data.location.address}
                </h3>
                <div className='search'>
                    <span className='iconfont'>&#xe6e1;</span>
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
                {
                    (data?.data.categories || []).map(item => {
                        return (
                            <div className="category-item">
                                <img
                                    src={item.imgUrl}
                                    alt={item.name}
                                    className='category-item-img'
                                />
                                <p className='category-item-desc'>{item.name}</p>
                            </div>
                        )
                    })
                }


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
                    {
                        (data?.data.freshes || []).map(item => {
                            return (
                                <div className="card-content-item">
                                    <img
                                        className='card-content-item-img'
                                        src={item.imgUrl}
                                        alt={item.name}
                                    />
                                    <p className='card-content-item-desc'>{item.name}</p>
                                    <p className='card-content-item-price'>
                                        <span className='card-content-item-yen'>&yen;</span>
                                        {item.price}
                                        <span className="iconfont">&#xe661;</span>
                                    </p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <div className="docker">
                <div className="docker-item">
                    <p className='iconfont docker-item-icon'>&#xe61c;</p>
                    <p className='docker-ite-title'>首页</p>
                </div>
                <div className="docker-item">
                    <p className='iconfont docker-item-icon'>&#xe61c;</p>
                    <p className='docker-ite-title'>首页</p>
                </div>
                <div className="docker-item">
                    <p className='iconfont docker-item-icon'>&#xe61c;</p>
                    <p className='docker-ite-title'>首页</p>
                </div>
                <div className="docker-item">
                    <p className='iconfont docker-item-icon'>&#xe61c;</p>
                    <p className='docker-ite-title'>首页</p>
                </div>
            </div>
        </div>
    )
}

export default Home;