import 'swiper/css';
import './style.scss';
import { useEffect, useState } from 'react';

import useRequest from '../../hooks/useRequest';
import type { ResponseType } from './types';
import Banner from './components/Banner';
import CateGory from './components/Category';
import Card from './components/Card';
import Docker from '../../components/Docker';

const defaultRequestData = {
    url: '/home.json',
    method: 'POST',
    data: {
        latitude: 37.7304167,
        longitude: -122.384425,
    }
}

const Home = () => {
    const localLocation = localStorage.getItem('location');
    const locationHistory = localLocation ? JSON.parse(localLocation) : null;

    if (locationHistory) {
        defaultRequestData.data.latitude = locationHistory.latitude;
        defaultRequestData.data.longitude = locationHistory.longitude;
    }
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
                console.log(e.message);
            }, { timeout: 500 });
        }
    }, [locationHistory])

    let { location, banners, categories, freshes } = data?.data || {}

    return (
        <div className='page home-page'>
            <Banner location={location} banners={banners} />
            <CateGory categories={categories} />
            <Card list={freshes} title={"新品尝鲜"} />

            <div className="bottom">
                —— 我是有底线的 ——
            </div>
            <Docker activeName='首页'></Docker>
        </div>
    )
}

export default Home;