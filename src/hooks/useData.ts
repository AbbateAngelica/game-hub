import { CanceledError, AxiosError, AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

export interface FetchResponse<T> {
    count: number;
    results: T[];
  }

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
    const controller = new AbortController();
      const allUsers = async () => {
        setLoading(true);
        try {
          const res = await apiClient.get<FetchResponse<T>>(endpoint, {signal: controller.signal, ...requestConfig});
          setData(res.data.results);
        } catch (err) {
            if (err instanceof CanceledError) return;
          setError((err as AxiosError).message);
        }
        controller.abort();
        setLoading(false);
      };
      
      allUsers();
      
    }, deps ? [...deps] : []);
    return {data, error, isLoading};
}

export default useData;