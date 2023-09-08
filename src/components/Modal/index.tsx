import './style.scss';
import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export type ModalInterfaceType = {
    showMessage: (message: string) => void
}

const Modal = forwardRef<ModalInterfaceType>((props, ref) => {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const divElementRef = useRef(document.createElement('div'));
    const divElement = divElementRef.current;

    useImperativeHandle(ref, () => {
        return {
            showMessage(message: string) {
                setMessage(message);
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 1500);
            }
        }
    }, [])

    useEffect(() => {
        if (showModal) {
            document.body.appendChild(divElement);

        } else {
            if (divElement.parentNode) {
                document.body.removeChild(divElement);
            }
        }
        return () => {
            if (divElement.parentNode) {
                document.body.removeChild(divElement);
            }
        }

    }, [showModal, divElement])

    return createPortal(
        <div className="modal">
            <div className="modal-text">{message}</div>
        </div>
        , divElement)

})

export default Modal;