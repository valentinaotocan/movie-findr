import { createContext, useState } from "react";
import { FavoriteContextType, Movie } from "../types";

export const FavoritesContext = createContext<FavoriteContextType>({
  favorites: [],
  favoritesChecker: () => false,
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState(
    localStorage.getItem("my-favorite")
      ? JSON.parse(localStorage.getItem("my-favorite")!)
      : []
  );

  const favoritesChecker = (movie: Movie) => {
    return favorites.map((favorite: Movie) => favorite.id).includes(movie.id);
  };

  const addToFavorites = (movie: Movie) => {
    const saveAs = {
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date
    }
    const myFavorites = [...favorites, saveAs];
    setFavorites(myFavorites);
    localStorage.setItem("my-favorite", JSON.stringify(myFavorites));
  };

  const removeFromFavorites = (movie: Movie) => {
    const myFavorites = favorites.filter((favorite: Movie) => favorite.id !== movie.id);
    setFavorites(myFavorites);
    localStorage.setItem("my-favorite", JSON.stringify(myFavorites));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesChecker,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
