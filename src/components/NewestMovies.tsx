import useFetchMovies from "../hooks/useFetchMovies";
import Loading from "./Loading";
import Error from "./Error";
import Card from "./Card";

function NewestMovies() {
  const today = new Date().toISOString().split("T")[0];
  const result = useFetchMovies("/discover/movie", {
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

  return (
    <>
      <h2 className="text-lg pb-3">Newest:</h2>
      <div className="overflow-x-auto flex flex-nowrap">
        <div className="flex flex gap-3.5">
          <Card movies={movies} />
        </div>
      </div>
    </>
  );
}
export default NewestMovies;
