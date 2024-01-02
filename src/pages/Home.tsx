import { NavLink } from "react-router-dom";
import filmReelSmall from "../assets/images/filmReel-small.jpg";
import filmReelMedium from "../assets/images/filmReel-medium.jpg";
import filmReelLarge from "../assets/images/filmReel-large.jpg";

function Home() {
  return (
    <section className="relative h-[calc(100vh-4rem)] pb-3.5 px-custom md:h-[calc(100vh-7rem)]">
      <picture>
        <source media="(max-width: 640px)" srcSet={filmReelSmall} />
        <source media="(max-width: 1024px)" srcSet={filmReelMedium} />
        <source media="(min-width: 1025px)" srcSet={filmReelLarge} />
        <img
          src={filmReelLarge}
          alt="Film Reel"
          className="w-full h-full object-cover object-center opacity-30 rounded"
        />
      </picture>
      <p className="absolute top-1/4 left-1/2 -translate-x-1/2 text-yellow-400 z-10 text-center text-lg font-medium">
        “To infinity and beyond!” — Buzz Lightyear in Toy Story
      </p>
      <NavLink
        to="/discover"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <button className="bg-gray-500 text-white py-3 px-7 rounded hover:bg-yellow-400 hover:text-black">
          Discover Movies
        </button>
      </NavLink>
    </section>
  );
}

export default Home;
