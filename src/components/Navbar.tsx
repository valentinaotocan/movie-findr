import { Link, NavLink } from "react-router-dom";
import Search from "./Search";

function Navbar() {
  return (
    <nav className="flex h-16 items-center w-full gap-3.5">
      <Link to="/" className="text-yellow-500 text-2xl">
        MovieFindr
      </Link>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/discover">Discovery</NavLink>
      <Search />
      <p>Favorites</p>
    </nav>
  );
}
export default Navbar;
