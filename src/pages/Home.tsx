import { NavLink } from "react-router-dom";
import filmReel from "../assets/images/film-reel.jpg";

function Home() {
  return (
    <div className="relative h-[calc(100vh-4rem)] pb-3.5">
      <img
        src={filmReel}
        alt="Film Reel"
        className="w-full h-full object-cover object-center opacity-30 rounded"
      />
      <p className="absolute top-1/4 left-1/2 -translate-x-1/2 text-yellow-500 z-10 text-center text-lg font-medium">
        “To infinity and beyond!” — Buzz Lightyear in Toy Story
      </p>
      <NavLink
        to="/discover"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <button className="bg-gray-500 text-white py-3 px-7 rounded hover:bg-yellow-500 hover:text-black">
          Discover Movies
        </button>
      </NavLink>
    </div>
  );
}
export default Home;
