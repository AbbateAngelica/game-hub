import { GameQuery } from "../App";
import useData from "./UseData";

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

// const onFilteredGames = () => {
//   const filteredGames = [...games];
//     filteredGames.filter((game) =>
//       game.id
//     );
// }

const useGames = (gameQuery : GameQuery) => 
useData<Game>("/games", {
  params: {
    genres: gameQuery.genre?.id, 
    parent_platforms: gameQuery.platform?.id 
  }}, 
  [
    gameQuery
  ]);

export default useGames;