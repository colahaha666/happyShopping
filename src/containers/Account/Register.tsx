import './style.scss';
import { useState, useRef } from 'react';
import useRequest from '../../utils/useRequest';
import Modal, { ModalInterfaceType } from '../../components/Modal';

type ResponseType = {
    success: boolean,
    data: boolean

}


const Register = () => {

    const [useName, setUseName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const modalRef = useRef<ModalInterfaceType>(null);


    const { request } = useRequest<ResponseType>()

    function handleSubmitBtnClick() {
        console.log(111);

        if (!useName) {
            modalRef.current?.showMessage('Please enter a username')
            return;
        }
        if (!phoneNumber) {
            modalRef.current?.showMessage('Please enter a phone number')
            return;
        }
        if (!password) {
            modalRef.current?.showMessage('Please enter a password')
            return;
        }
        if (password.length < 6) {
            modalRef.current?.showMessage('输入的密码不得小于六位')
            return;
        } if (password !== checkPassword) {
            modalRef.current?.showMessage('两次输入的密码不一致')
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
            data && console.log(data);
        }).catch((e: any) => {
            modalRef.current?.showMessage(e?.message || '异常错误')
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
                        type="password"
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
            <Modal ref={modalRef} />
        </>
    )
}

export default Register;