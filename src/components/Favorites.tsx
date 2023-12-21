import { useState, useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp, FaBookmark } from "react-icons/fa6";

function Favorites() {
  const [dropdown, setDropdown] = useState(false);
  const { favorites, favoritesChecker, removeFromFavorites } =
    useContext(FavoritesContext);
  return (
    <>
      <button
        className={`p-2 text-center inline-flex items-center ${
          dropdown
            ? "bg-yellow-400 text-black"
            : "bg-gray-500 text-white hover:bg-yellow-500 hover:text-black"
        } rounded`}
        type="button"
        onClick={() => setDropdown(!dropdown)}
      >
        Favorites
        {dropdown ? (
          <FaAngleUp className="ms-2.5" />
        ) : (
          <FaAngleDown className="ms-2.5" />
        )}
      </button>

      {dropdown && (
        <div className="z-20 absolute rounded-lg w-44 dark:bg-gray-500 text-white mt-3 top-[3.25rem] right-[4%] md:right-[unset] md:top-[10.3rem] overflow-auto max-h-[31.25rem] md:max-h-[18.75rem]">
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <div
                key={item.id}
                className="border-b-[1px] last:border-b-0 border-b-gray-600 hover:bg-gray-100 dark:hover:bg-gray-400 dark:hover:text-white hover:rounded-lg"
              >
                {favoritesChecker(item) && (
                  <FaBookmark
                    className="absolute text-[1.625rem] left-1 text-yellow-500 hover:text-opacity-70 cursor-pointer"
                    onClick={() => removeFromFavorites(item)}
                  />
                )}
                <Link
                  to={`/details/${item.id}`}
                  className="block px-4 py-2"
                  onClick={() => setDropdown(!dropdown)}
                >
                  <p className="indent-5">{item.title}</p>
                  <p className="text-center">
                    {new Date(item.release_date).getFullYear()}
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
export default Favorites;
