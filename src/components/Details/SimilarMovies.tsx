import useSWR from "swr";
import { useParams } from "react-router-dom";
import { fetcher } from "../../api/fetcher";
import { baseUrl, apiKey } from "../../api/config";
import Card from "../common/Card";
import Loading from "../common/Loading";
import Error from "../common/Error";

function SimilarMovies() {
  const { movie_id } = useParams();
  const movieIdNum = movie_id ? parseInt(movie_id, 10) : undefined;

  const { data, error, isLoading } = useSWR(
    movieIdNum
      ? `${baseUrl}/movie/${movie_id}/similar?api_key=${apiKey}&language=en-US`
      : null,
    fetcher
  );

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <h2 className="pb-3.5">People who also liked {data.title}</h2>
      <div className="overflow-x-auto flex flex-nowrap">
        <div className="flex gap-3.5">
          {(data.results && data.results.length > 0) ? (
            <Card movies={data.results} layout="horizontal" />
          ) : (
            <p>No similar movies available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SimilarMovies;
