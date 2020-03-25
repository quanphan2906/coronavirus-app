import { useState, useEffect } from "react";

function useFetchData(initialData, fetchFunc) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setError(false);
            setIsLoading(true);
            try {
                const res = await fetchFunc();
                if (res) setData(res);
            } catch (error) {
                setError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [fetchFunc]);
    return [{ data, isLoading, error }, setData, setIsLoading, setError];
}

export default useFetchData;
