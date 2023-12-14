import { useState, useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp, FaBookmark } from "react-icons/fa6";

function Favorites() {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites, favoritesChecker, removeFromFavorites } =
    useContext(FavoritesContext);
  return (
    <div>
      <button
        className={`text-white p-2 text-center inline-flex items-center ${
          isOpen
            ? "bg-yellow-400 text-black"
            : "bg-gray-500 hover:bg-yellow-400 hover:text-black"
        } rounded`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Favorites
        {isOpen ? (
          <FaAngleUp className="w-3 h-3 ms-2.5" />
        ) : (
          <FaAngleDown className="w-3 h-3 ms-2.5" />
        )}
      </button>

      {isOpen && (
        <div className="z-10 absolute rounded-lg w-44 dark:bg-gray-500 text-white mt-3">
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <div
                key={item.id}
                className="border-b-[1px] last:border-b-0 border-b-gray-600 hover:bg-gray-100 dark:hover:bg-gray-400 dark:hover:text-white hover:rounded-lg"
              >
                {favoritesChecker(item) && (
                  <FaBookmark
                    className="absolute text-[26px] left-1 text-yellow-500 hover:text-opacity-70 cursor-pointer"
                    onClick={() => removeFromFavorites(item)}
                  />
                )}
                <Link to={`/details/${item.id}`} className="block px-4 py-2">
                  <p className="indent-5">{item.title}</p>
                  <p className="text-center">
                    {new Date(item.release_date).getFullYear()}
                  </p>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-yellow-500">
              You don't have any favorite movies!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
export default Favorites;
