import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../../context/FavoritesContext";
import { FaBookmark } from "react-icons/fa6";
import { CardsProps } from "../../types";

function Cards({ movies, layout, height }: CardsProps) {
  const { favoritesChecker, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const moviesWithImg = movies.filter((movie) => movie.poster_path);

  return (
    <>
      {moviesWithImg.map((movie) => (
        <div
          key={movie.id}
          className={`relative overflow-hidden ${
            layout === "horizontal" ? "w-[11.875rem] h-[16.875rem]" : ""
          } ${height || ""}`}
        >
          <Link to={`/details/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover rounded"
            />
          </Link>
          {favoritesChecker(movie) ? (
            <FaBookmark
              className="absolute text-[1.625rem] -top-[0.125rem] left-0 pl-2 text-yellow-400 cursor-pointer"
              onClick={() => removeFromFavorites(movie)}
            />
          ) : (
            <FaBookmark
                className="absolute text-[1.625rem] -top-[0.125rem] left-0 pl-2 text-gray-300 hover:text-white cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  addToFavorites(movie)
                }}
            />
          )}
        </div>
      ))}
    </>
  );
}
export default Cards;
