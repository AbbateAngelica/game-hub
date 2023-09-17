import useData from "./UseData";
import { Genre } from "./useGenres";

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

const useGames = (selectedGenre:Genre | null, selectedPlatform: Platform | null) => 
useData<Game>("/games", {
  params: {
    genres: selectedGenre?.id, 
    parent_platforms: selectedPlatform?.id 
  }}, 
  [
    selectedGenre?.id, 
    selectedPlatform?.id
  ]);

export default useGames;