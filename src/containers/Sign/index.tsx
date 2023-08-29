import { useNavigate } from 'react-router-dom';
import './style.scss';

const Sign = () => {
    const navigate = useNavigate();
    const handleItemRightClick = () => {
        navigate('/sign');
    }
    const handleItemLeftClick = () => {
        navigate('/login');
    }
    return (
        <div className="page sign-page">
            <div className="tab">
                <div className="tab-item tab-item-left" onClick={handleItemLeftClick}>登录</div>
                <div className="tab-item tab-item-right" onClick={handleItemRightClick}>注册</div>
            </div>
            <div className="form">
                <div className="form-item">
                    <div className="form-item-title">用户名</div>
                    <input className="form-item-content" placeholder="请输入用户名" />
                </div>
                <div className="form-item">
                    <div className="form-item-title">手机号</div>
                    <input className="form-item-content" placeholder="请输入手机号" type="password" />
                </div>
                <div className="form-item">
                    <div className="form-item-title">密码</div>
                    <input className="form-item-content" placeholder="请输入密码" type="password" />
                </div>
                <div className="form-item">
                    <div className="form-item-title">确认密码</div>
                    <input className="form-item-content" placeholder="请再次输入密码" type="password" />
                </div>
            </div>
            <div className="submit">
                注册
            </div>
        </div>
    )
}

export default Sign;