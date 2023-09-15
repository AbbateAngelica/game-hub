import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames, { Game } from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

const GameGrid = () => {
  const { games, error, isLoading } = useGames();
  const skeleton = [1, 2, 3, 4, 5];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding={10}
        spacing={10}
      >
        {isLoading &&
          skeleton.map((s) => <GameCardSkeleton key={s}></GameCardSkeleton>)}
        {games.map((i: Game) => {
          return <GameCard game={i} key={i.id}></GameCard>;
        })}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
