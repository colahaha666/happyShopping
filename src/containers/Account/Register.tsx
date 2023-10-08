import './style.scss';
import { useState } from 'react';
import useRequest from '../../hook/useRequest';
import { message } from '../../utils/message';
import { useNavigate } from 'react-router-dom';
import type { RegisterResponseType } from './types';

const Register = () => {

    const navigate = useNavigate();

    const [useName, setUseName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');


    const { request } = useRequest<RegisterResponseType>({ manual: true });

    function handleSubmitBtnClick() {
        if (!useName) {
            message('Please enter a username')
            return;
        }
        if (!phoneNumber) {
            message('Please enter a phone number')
            return;
        }
        if (!password) {
            message('Please enter a password')
            return;
        }
        if (password.length < 6) {
            message('请输入的密码不少于六位')
            return;
        } if (password !== checkPassword) {
            message('两次输入的密码不一致')
            return;
        }
        request({
            url: '/register.json',
            method: 'POST',
            data: {
                useName: useName,
                phone: phoneNumber,
                password: password,
            }
        }).then((data) => {
            if (data?.success) {
                navigate('/account/login')
            }
        }).catch((e: any) => {
            message(e?.message || '异常错误')
        });
    }


    return (
        <>
            <div className="form">
                <div className="form-item">
                    <div className="form-item-title">用户名</div>
                    <input
                        value={useName}
                        className="form-item-content"
                        placeholder="请输入用户名"
                        onChange={e => setUseName(e.target.value)}
                    />
                </div>
                <div className="form-item">
                    <div className="form-item-title">手机号</div>
                    <input
                        value={phoneNumber}
                        className="form-item-content"
                        placeholder="请输入手机号"
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="form-item">
                    <div className="form-item-title">密码</div>
                    <input
                        value={password}
                        className="form-item-content"
                        placeholder="请输入密码"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-item">
                    <div className="form-item-title">确认密码</div>
                    <input
                        value={checkPassword}
                        className="form-item-content"
                        placeholder="请再次输入密码"
                        type="password"
                        onChange={e => setCheckPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="submit" onClick={handleSubmitBtnClick}>
                注册
            </div>
        </>
    )
}

export default Register;