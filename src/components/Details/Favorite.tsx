import { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import { FaBookmark } from "react-icons/fa6";
import { FavoriteProps } from "../../types";

function Favorite({ movie }: FavoriteProps) {
  const { favoritesChecker, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  const isFavorite = favoritesChecker(movie);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(movie);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <button onClick={handleFavoriteClick} className="flex items-center">
      <span className="font-semibold drop-shadow-[#facc15_0.063rem_0_0.625rem] pr-2">
        {favoritesChecker(movie) ? "Remove from favorite" : "Add to favorite"}
      </span>
      <FaBookmark
        className={
          favoritesChecker(movie) ? "text-yellow-400" : "text-gray-300"
        }
      />
    </button>
  );
}

export default Favorite;
