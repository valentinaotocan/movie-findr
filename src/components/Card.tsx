import { Link } from "react-router-dom";
import { CardProps } from "../types";
import { FaBookmark } from "react-icons/fa6";
import { FavoritesContext } from "../context/FavoritesContext";
import { useContext } from "react";

function Card({ movies }: CardProps) {
  const { favoritesChecker, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const moviesWithImg = movies.filter((movie) => movie.poster_path);

  return (
    <div className="overflow-x-auto flex flex-nowrap">
      <div className="flex gap-3.5">
        {moviesWithImg.map((movie) => (
          <div
            key={movie.id}
            className="w-[190px] h-[270px] flex-shrink-0 relative"
          >
            <Link to={`/details/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </Link>
            {favoritesChecker(movie) ? (
              <FaBookmark
                className="absolute text-[32px] -top-[2px] left-0 pl-2 text-yellow-500 cursor-pointer"
                onClick={() => removeFromFavorites(movie)}
              />
            ) : (
              <FaBookmark
                className="absolute text-[32px] -top-[2px] left-0 pl-2 text-gray-300 cursor-pointer"
                onClick={() => addToFavorites(movie)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Card;
