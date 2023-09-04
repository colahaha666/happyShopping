import axios, { AxiosRequestConfig } from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function useRequest<T>(options: AxiosRequestConfig = {
    url: '/', method: 'GET', data: {}, params: {}
}) {
    const navigate = useNavigate();
    const [data, setData] = useState<T | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState('');
    const controllerRef = useRef(new AbortController());

    const cancel = () => {
        controllerRef.current.abort();
    }

    const request = (requestOptions?: AxiosRequestConfig) => {
        setData(null);
        setLoaded(false);
        setError('');

        const loginToken = localStorage.getItem('token');
        const headers = loginToken ? {
            'token': loginToken
        } : {}

        return axios.request<T>({
            url: requestOptions?.url || options.url,
            method: requestOptions?.method || options.method,
            signal: controllerRef.current.signal,
            data: requestOptions?.data || options.data,
            params: requestOptions?.params || options.params,
            headers,
        }).then(response => {
            setData(response.data);
            return response.data;
        }).catch((e: any) => {
            if (e?.response?.status === 403) {
                localStorage.removeItem('token');
                navigate('/account/login');
            }
            setError(e.message || 'unknown request error');
            throw new Error(e);
        }).finally(() => {
            setLoaded(true);
        })

    }
    return { data, loaded, error, request, cancel }
}

export default useRequest;