import 'swiper/css';
import './style.scss';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useRequest from '../../utils/useRequest';

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
    const { request } = useRequest(requestData)

    useEffect(() => {
        request().then(data => {
            console.log(data);

        }).catch(e => {
            console.log(e);

        })
    }, [requestData, request])

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
                console.log(e);
            }, { timeout: 500 });
        }
    }, [])

    const [page, setPage] = useState(1);
    return (
        <div className='page home-page'>
            <div className='banner'>
                <h3 className='location'>
                    <span className='iconfont icon-didian'></span>
                    优果购(昌平店)
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
                        <SwiperSlide>
                            <div className='swiper-item'>
                                <img className='swiper-item-img' src='http://statics.dell-lee.com/shopping/banner.png' alt='轮播图' />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='swiper-item'>
                                <img className='swiper-item-img' src='http://statics.dell-lee.com/shopping/banner.png' alt='轮播图' />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <div className='pagination'>{page}/2</div>
                </div>
            </div>
        </div>
    )
}

export default Home;