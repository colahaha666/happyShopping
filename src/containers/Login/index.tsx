import './style.scss';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const handleItemRightClick = () => {
        navigate('/sign');
    }
    const handleItemLeftClick = () => {
        navigate('/login');
    }
    return (
        <div className="page login-page">
            <div className="tab">
                <div className="tab-item tab-item-left" onClick={handleItemLeftClick}>登录</div>
                <div className="tab-item tab-item-right" onClick={handleItemRightClick}>注册</div>
            </div>
            <div className="form">
                <div className="form-item">
                    <div className="form-item-title">手机号</div>
                    <input className="form-item-content" placeholder="请输入手机号码" />
                </div>
                <div className="form-item">
                    <div className="form-item-title">密码</div>
                    <input className="form-item-content" placeholder="请输入密码" type="password" />
                </div>
            </div>
            <div className="submit">
                登录
            </div>
            <p className='notice'>
                *登录即表示您赞同使用条款及隐私政策
            </p>
        </div>
    )
}

export default Login;