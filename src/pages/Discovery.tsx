import NewestMovies from "../components/NewestMovies"

function Discovery() {
  return (
    <div>
      <h1 className="text-white pt-4 text-xl">Discover movies</h1>
      <p className="py-4">
        Dive into our 'New movies' selection, featuring the latest hits fresh
        off the film reel. Explore the 'Popular' to discover the movie that
        vibes with your mood — because your watchlist should be as curated as your
        favorite playlist.
      </p>
      <NewestMovies />
    </div>
  );
}
export default Discovery