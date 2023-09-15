import { AxiosError, CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

export interface Game {
    id: number;
    name: string;
    background_image: string; 
    parent_platforms: { platform: Platform}[]
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
  
    useEffect(() => {
    const controller = new AbortController();
      const allUsers = async () => {
        try {
          const res = await apiClient.get<FetchGames>("/games", {signal: controller.signal});
          setGames(res.data.results);
        } catch (err) {
            if (err instanceof CanceledError) return;
          setError((err as AxiosError).message);
        }
        controller.abort();
      };
      allUsers();
    }, []);
    return {games, error};
}

export default useGames;