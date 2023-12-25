import { useState, useEffect } from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import useFetchGenres from "../hooks/useFetchGenres";
import Loading from "./Loading";
import Error from "./Error";
import Card from "./Card";

interface Genre {
  id: number;
  name: string;
}

function PopularByGenre() {
  const {
    genres,
    loading: genresLoading,
    error: genresError,
  } = useFetchGenres({
    endpoint: "/genre/movie/list",
  });

  const [selectedGenre, setSelectedGenre] = useState<Genre>({
    id: 28,
    name: "Action",
  });

  const {
    movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetchMovies("/discover/movie", {
    with_genres: selectedGenre.id,
    sort_by: "popularity.desc",
  });

  console.log(movies);

  return (
    <section className="px-custom">
      <h2 className="pb-3 pt-6">Popular by genre:</h2>
      {genresLoading && <Loading />}
      {genresError && <Error />}
      {genres && (
        <div className="flex justify-center flex-wrap gap-3.5 md:gap-2 pb-4">
          {genres.map((genre) => (
            <div
              key={genre.id}
              onClick={() => setSelectedGenre(genre)}
              className={`cursor-pointer ${
                selectedGenre && selectedGenre.id === genre.id
                  ? "border-b-4 border-yellow-500"
                  : ""
              }`}
            >
              {genre.name}
            </div>
          ))}
        </div>
      )}
      {selectedGenre && (
        <>
          {moviesLoading && <Loading />}
          {moviesError && <Error />}
          <div className="overflow-x-auto flex flex-nowrap">
            <div className="flex gap-3.5">
              {movies && <Card movies={movies} layout="horizontal" />}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default PopularByGenre;
