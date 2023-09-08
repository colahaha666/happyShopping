import './style.scss';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const location = useLocation();
    const isLoginActived = location.pathname === '/account/login';
    const loginActiveCalss = isLoginActived ? 'tab-item-active' : '';
    const registerActiveCalss = !isLoginActived ? 'tab-item-active' : '';

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home');
        }
    }, [navigate])


    return (
        <div className="page account-page">
            <div className="tab">
                <div className={`tab-item tab-item-left ${loginActiveCalss}`}  >
                    <Link to='/account/login'>登录</Link>
                </div>
                <div className={`tab-item tab-item-right ${registerActiveCalss}`} >
                    <Link to='/account/register'>注册</Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Account;