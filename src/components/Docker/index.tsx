import './style.scss';
import { useNavigate } from 'react-router-dom';

const items = [{
    url: '/home',
    icon: '&#xe604;',
    text: '首页'
}, {
    url: '/category',
    icon: '&#xe60d;',
    text: '分类'
}, {
    url: '/cart',
    icon: '&#xe600;',
    text: '购物车'
}, {
    url: '/my',
    icon: '&#xe61c;',
    text: '我的'
},]

function Docker(props: { activeName: string }) {
    const { activeName } = props
    const navigate = useNavigate()
    return (
        <div className="docker">
            {
                items.map(item => {
                    return (
                        <div
                            className={item.text === activeName ? 'docker-item docker-item-active' : 'docker-item'}
                            onClick={() => navigate(item.url)}
                            key={item.url}
                        >
                            <p
                                className='iconfont docker-item-icon'
                                dangerouslySetInnerHTML={{ __html: item.icon }}
                            ></p>
                            <p className='docker-ite-title'>{item.text}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Docker;