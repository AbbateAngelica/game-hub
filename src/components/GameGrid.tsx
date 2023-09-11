import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";
import { Text } from "@chakra-ui/react";

interface Game {
  id: number;
  name: string;
}

interface FetchGames {
  count: number;
  results: Game[];
}

const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const allUsers = async () => {
      try {
        const res = await apiClient.get<FetchGames>("/games");
        setGames(res.data.results);
      } catch (err) {
        setError((err as AxiosError).message);
      }
    };
    allUsers();
  }, []);

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {games.map((i: Game) => {
          return <li key={i.id}>{i.name}</li>;
        })}
      </ul>
    </>
  );
};

export default GameGrid;
