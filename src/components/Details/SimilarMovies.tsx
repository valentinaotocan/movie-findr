import { useParams } from "react-router-dom";
import Cards from "../common/Cards";
import Loading from "../common/Loading";
import Error from "../common/Error";
import useFetchMovies from "../../hooks/useFetchMovies";

function SimilarMovies({ title }: { title: string }) {
  const { movie_id } = useParams();

  const { movies, isLoading, error } = useFetchMovies(
    `/movie/${movie_id}/similar`
  );

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <h2 className="pb-3.5">People who also liked: {title}</h2>
      <div className="overflow-x-auto flex flex-nowrap">
        <div className="flex gap-3.5">
          {movies && movies.length > 0 ? (
            <Cards movies={movies} layout="horizontal" />
          ) : (
            <p>No similar movies available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SimilarMovies;
