import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import Error from "./Error";
import Card from "./Card";

function NewestMovies() {
  const today = new Date().toISOString().split("T")[0];
  const result = useFetch("/discover/movie", {
    sort_by: "primary_release_date.desc",
    "primary_release_date.lte": today,
    with_original_language: "en",
  });

  if (result.loading) {
    return <Loading />;
  }

  if (result.error) {
    return <Error />;
  }

  const { movies } = result;

  const moviesWithPosters = movies.filter(
    (movie) => movie.poster_path
  );

  return (
    <div>
      <h2 className="text-lg">Newest:</h2>
      <Card movies={moviesWithPosters}/>
    </div>
  );
}
export default NewestMovies;
