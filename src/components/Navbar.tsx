import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import Search from "./Search/Search";
import Favorites from "./FavoriteMovies";
import FavoriteMovies from "./FavoriteMovies";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(document.body);

  const handleMenu = () => {
    setIsOpen(!isOpen);
    ref.current.style.overflow = isOpen ? "auto" : "hidden";
  };

  return (
    <>
      {/* Desktop Version */}
      <nav className="flex h-16 items-center w-full gap-3.5 px-custom relative md:hidden">
        <Link to="/" className="text-yellow-400 text-2xl">
          MovieFindr
        </Link>
        <NavLink to="/" className="hover:text-[--medium-grey-2]">
          Home
        </NavLink>
        <NavLink to="/discover" className="hover:text-[--medium-grey-2]">
          Discover
        </NavLink>
        <Search />
        <FavoriteMovies onMovieSelect={() => {}} />
      </nav>

      {/* Smaller screens */}
      <nav className="hidden md:flex md:h-28 flex-col justify-evenly">
        <div className="flex justify-between items-center px-4">
          <Link to="/" className="text-yellow-400 text-2xl">
            MovieFindr
          </Link>
          <div className="text-[1.25rem] text-white" onClick={handleMenu}>
            {isOpen ? (
              <FaXmark className="absolute z-30 right-4 top-[1.125rem]" />
            ) : (
              <FaBars />
            )}
          </div>
        </div>
        <div className="px-4 sm:px-0">
          <Search />
        </div>
        {isOpen && (
          <div className="bg-[--primary-blue] w-full h-full fixed top-0 right-0 z-20 flex flex-col items-center gap-5 py-10">
            <NavLink to="/" onClick={handleMenu}>
              Home
            </NavLink>
            <NavLink to="/discover" onClick={handleMenu}>
              Discover
            </NavLink>
            <FavoriteMovies onMovieSelect={handleMenu} />
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
