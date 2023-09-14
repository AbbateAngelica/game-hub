import { Text } from "@chakra-ui/react";
import useGames, { Game } from "../hooks/useGames";

const GameGrid = () => {
  const { games, error } = useGames();

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
