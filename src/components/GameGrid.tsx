import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGames from "../hooks/useGames";
import { Game } from "../entities/Game";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

const GameGrid = () => {
  const {
    data: games,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useGames();

  const skeleton = [1, 2, 3, 4, 5];
  const fetchedGamesCount =
    games?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  return (
    <>
      {error && <Text>{error.message}</Text>}

      {
        // BOTON PARA INFINITE QUERY (opcional al infinite scroll)
        /* {hasNextPage && (
        <Button onClick={() => fetchNextPage()} marginBottom={5}>
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      )} */
      }
      <InfiniteScroll
        dataLength={fetchedGamesCount} //This is important field to render the next data
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
          paddingY={5}
          spacing={4}
        >
          {isLoading &&
            skeleton.map((s) => (
              <GameCardContainer key={s}>
                <GameCardSkeleton />
              </GameCardContainer>
            ))}
          {games?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((i: Game) => {
                return (
                  <GameCardContainer isFlex key={i.id}>
                    <GameCard game={i} />
                  </GameCardContainer>
                );
              })}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  );
};

export default GameGrid;
