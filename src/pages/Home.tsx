import { NavLink } from "react-router-dom";
import filmReelSmall from "../assets/images/filmReel-small.jpg";
import filmReelMedium from "../assets/images/filmReel-medium.jpg";
import filmReelLarge from "../assets/images/filmReel-large.jpg";

function Home() {
  return (
    <section className="h-[calc(100vh-4rem)] pb-3.5 px-custom md:h-[calc(100vh-7rem)]">
      <div className="relative w-full h-full">
        <picture className="w-full h-full">
          <source media="(max-width: 640px)" srcSet={filmReelSmall} />
          <source media="(max-width: 1024px)" srcSet={filmReelMedium} />
          <source media="(min-width: 1025px)" srcSet={filmReelLarge} />
          <img
            src={filmReelLarge}
            alt="Film Reel"
            className="w-full h-full object-cover object-center rounded"
          />
        </picture>
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-center px-3">
          <p className="text-yellow-400 text-lg font-medium z-10">
            “To infinity and beyond!” — Buzz Lightyear in Toy Story
          </p>
          <NavLink to="/discover" className="mt-16">
            <button className="bg-gray-500 text-white py-3 px-7 rounded hover:bg-yellow-400 hover:text-black">
              Discover Movies
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default Home;

