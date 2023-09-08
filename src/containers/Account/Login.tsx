import './style.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRequest from '../../hook/useRequest';
import { message } from '../../utils/message';
import type { LoginResponseType } from './types';

const Login = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { request } = useRequest<LoginResponseType>({ manual: true })

    function handleSubmitBtnClick() {
        if (!phoneNumber) {
            message('Please enter a phone number')
            return;
        }
        if (!password) {
            message('Please enter a password')
            return;
        }
        request({
            url: '/login.json',
            method: 'POST',
            data: {
                phone: phoneNumber,
                password: password,
            }
        }).then((data) => {
            const { data: { token } } = data;
            if (token) {
                localStorage.setItem('token', token)
                navigate('/home');
            }

        }).catch((e: any) => {
            message(e.message || '异常错误')
        });
    }

    return (
        <>
            <div className="form">
                <div className="form-item">
                    <div className="form-item-title">手机号</div>
                    <input
                        className="form-item-content"
                        placeholder="请输入手机号码"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="form-item">
                    <div className="form-item-title">密码</div>
                    <input
                        className="form-item-content"
                        placeholder="请输入密码"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="submit" onClick={handleSubmitBtnClick}>
                登录
            </div>
            <p className='notice'>
                *登录即表示您赞同使用条款及隐私政策
            </p>
        </>
    )
}

export default Login;