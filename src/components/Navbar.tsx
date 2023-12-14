import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import Favorites from "./Favorites";

function Navbar() {
  return (
    <nav className="flex h-16 items-center w-full gap-3.5">
      <Link to="/" className="text-yellow-400 text-2xl">
        MovieFindr
      </Link>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/discover">Discovery</NavLink>
      <Search />
      <Favorites />
    </nav>
  );
}
export default Navbar;
