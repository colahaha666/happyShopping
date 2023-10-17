import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "../utils/message";

const defaultRequestConfig = {
    url: '/', method: 'GET', data: {}, params: {}
}

function useRequest<T>(
    options: AxiosRequestConfig & { manual?: boolean } = defaultRequestConfig
) {
    const navigate = useNavigate();
    const [data, setData] = useState<T | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState('');
    const controllerRef = useRef(new AbortController());

    const cancel = () => {
        controllerRef.current.abort();
    }

    const request = useCallback((requestOptions: AxiosRequestConfig) => {
        setData(null);
        setLoaded(false);
        setError('');

        const loginToken = localStorage.getItem('token');
        const headers = loginToken ? {
            'token': loginToken
        } : {}

        return axios.request<T>({
            url: requestOptions.url,
            method: requestOptions.method,
            signal: controllerRef.current.signal,
            data: requestOptions.data,
            params: requestOptions.params,
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
    }, [navigate]);

    useEffect(() => {
        if (!options.manual) {
            request(options).catch(e => {
                message(e?.message)
            })
        }
    }, [options, request]);

    return { data, loaded, error, request, cancel }
}

export default useRequest;