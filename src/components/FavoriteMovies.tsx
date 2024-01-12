import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import { FaBookmark } from "react-icons/fa6";
import DropdownButton from "./common/DropdownButton";

function FavoriteMovies({ onMovieSelect }: { onMovieSelect: () => void }) {
  const [dropdown, setDropdown] = useState(false);
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  return (
    <>
      <DropdownButton
        isOpen={dropdown}
        label="Favorites"
        toggle={() => setDropdown(!dropdown)}
        className={`p-2 text-center ${
          dropdown
            ? "bg-yellow-400 text-black"
            : "bg-gray-500 text-white hover:bg-yellow-500 hover:text-black"
        } rounded`}
      />
      {dropdown && (
        <div className="z-20 absolute rounded-lg w-44 dark:bg-gray-500 text-white mt-3 top-[3.25rem] right-[4%] md:right-[unset] md:top-[10.3rem] overflow-auto max-h-[20rem] fav-h">
          {favorites.length > 0 ? (
            favorites.map((movie) => (
              <div
                key={movie.id}
                className="border-b-[0.063rem] last:border-b-0 border-b-gray-600 hover:bg-gray-100 dark:hover:bg-gray-400 dark:hover:text-white hover:rounded-lg"
              >
                  <FaBookmark
                    className="absolute text-[1.625rem] left-1 text-yellow-500 hover:text-opacity-70 cursor-pointer"
                    onClick={() => removeFromFavorites(movie)}
                  />
                <Link
                  to={`/details/${movie.id}`}
                  className="block px-4 py-2"
                  onClick={() => {
                    setDropdown(!dropdown);
                    onMovieSelect();
                  }}
                >
                  <p className="indent-5">{movie.title}</p>
                  <p className="text-center">
                    <p>
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : "N/A"}
                    </p>
                  </p>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-yellow-400 px-4 py-2">
              You don't have any favorite movies!
            </p>
          )}
        </div>
      )}
    </>
  );
}
export default FavoriteMovies;
