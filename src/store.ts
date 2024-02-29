import { create } from "zustand";
import { Platform } from "./hooks/usePlatforms";
import { Genre } from "./hooks/useGenres";

interface GameQuery {
  genre?: Genre | null;
  platform?: Platform | null;
  sortOrder?: string | null;
  searchText?: string;
}

interface GameQueryStore {
  gameQuery: GameQuery;
  setGenre: (genre: Genre) => void;
  setPlatform: (platform: Platform) => void;
  setSortOrder: (sortOrder: string) => void;
  setSearchText: (searchText: string) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {},
  setGenre: (genre) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, genre } })),
  setPlatform: (platform) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, platform } })),
  setSortOrder: (sortOrder) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, sortOrder } })),
  setSearchText: (searchText) => set(() => ({ gameQuery: { searchText } })),
}));

export default useGameQueryStore;
