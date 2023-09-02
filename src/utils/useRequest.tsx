import axios, { AxiosRequestConfig, Method } from "axios";
import { useRef, useState } from "react";

function useRequest<T>(url: string, method: Method, payload: AxiosRequestConfig) {
    const [data, setData] = useState<T | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState('');
    const controllerRef = useRef(new AbortController());

    const cancel = () => {
        controllerRef.current.abort();
    }

    const request = async () => {
        setData(null);
        setLoaded(false);
        setError('');

        try {
            const response = await axios.request<T>({
                url,
                method,
                signal: controllerRef.current.signal,
                data: payload
            })
            setData(response.data);
        } catch (e: any) {
            setError(e.message || 'unknown request error');
        } finally {
            setLoaded(true);
        }
    }
    return { data, loaded, error, request, cancel }
}

export default useRequest;