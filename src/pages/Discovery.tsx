import Filters from "../components/Filters";
import NewestMovies from "../components/NewestMovies"
import PopularByGenre from "../components/PopularByGenre";

function Discovery() {
  return (
    <section className="pb-6">
      <h1 className="pt-4 px-custom">Discover movies</h1>
      <p className="py-4 px-custom">
        Dive into our 'New movies' selection, featuring the latest hits fresh
        off the film reel. Explore the 'Popular' to discover the movie that
        vibes with your mood — because your watchlist should be as curated as
        your favorite playlist.
      </p>
      <NewestMovies />
      <PopularByGenre />
      <Filters />
    </section>
  );
}
export default Discovery