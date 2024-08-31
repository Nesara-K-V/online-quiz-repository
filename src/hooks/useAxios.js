import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';

axios.defaults.baseURL = "https://opentdb.com/";

const useAxios = ({ url }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setResponse(res.data);
        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { response, error, loading };
};

export default useAxios;
