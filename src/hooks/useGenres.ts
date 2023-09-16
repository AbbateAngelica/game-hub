import { CanceledError, AxiosError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

export interface Genre {
    id: number;
    name: string;
}

interface FetchGenres {
    count: number;
    results: Genre[];
  }

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
    const controller = new AbortController();
      const allUsers = async () => {
        setLoading(true);
        try {
          const res = await apiClient.get<FetchGenres>("/genres", {signal: controller.signal});
          setGenres(res.data.results);
        } catch (err) {
            if (err instanceof CanceledError) return;
          setError((err as AxiosError).message);
        }
        controller.abort();
        setLoading(false);
      };
      
      allUsers();
      
    }, []);
    return {genres, error, isLoading};
}

export default useGenres;