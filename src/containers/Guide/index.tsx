import { useCallback, useEffect, useRef } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const Guide = () => {

    const ref = useRef<HTMLDivElement>(null!);
    useEffect(() => {
        ref.current.style.opacity = '1';
    }, [])

    const navigate = useNavigate();
    const handleIconClick = useCallback(() => {
        localStorage.getItem('token') ? navigate('/home') : navigate('/account/login');
    }, [navigate])

    return (
        <div className='page guide-page' ref={ref}>
            <img
                className="main-pic"
                src={require('../../images/halg_logo_icon_@2x.png')}
                alt="欢乐购"
            />
            <div className="title">欢乐购</div>
            <img
                className="sub-pic"
                src={require('../../images/slogn_word_icon_@2x.png')}
                alt="欢乐购"
            />
            <div
                className="iconfont arrow-icon"
                onClick={handleIconClick}
            >&#xe60c;</div>
        </div>
    );
}

export default Guide;
