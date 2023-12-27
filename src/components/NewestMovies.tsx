import useFetchMovies from "../hooks/useFetchMovies";
import Loading from "./Loading";
import Error from "./Error";
import Card from "./Card";

function NewestMovies() {
  const today = new Date().toISOString().split("T")[0];
  const {movies, isLoading, error} = useFetchMovies("/discover/movie/", {
    sort_by: "primary_release_date.desc",
    "primary_release_date.lte": today,
    with_original_language: "en",
  });

  return (
    <section className="px-custom">
      <h2 className="pb-3">Newest:</h2>
      {isLoading && <Loading />}
      {error && <Error />}
      <div className="overflow-x-auto flex flex-nowrap">
        <div className="flex flex gap-3.5">
          <Card movies={movies} layout="horizontal" />
        </div>
      </div>
    </section>
  );
}
export default NewestMovies;
