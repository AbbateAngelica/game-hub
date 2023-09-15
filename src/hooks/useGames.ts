import { AxiosError, CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

export interface Game {
    id: number;
    name: string;
    background_image: string; 
    parent_platforms: { platform: Platform}[]
    metacritic: number,
  }
  
export interface Platform {
  id: number,
  name: string,
  slug: string,
}

interface FetchGames {
    count: number;
    results: Game[];
  }

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
    const controller = new AbortController();
      const allUsers = async () => {
        setLoading(true);
        try {
          const res = await apiClient.get<FetchGames>("/games", {signal: controller.signal});
          setGames(res.data.results);
        } catch (err) {
            if (err instanceof CanceledError) return;
          setError((err as AxiosError).message);
        }
        controller.abort();
        setLoading(false);
      };
      
      allUsers();
      
    }, []);
    return {games, error, isLoading};
}

export default useGames;