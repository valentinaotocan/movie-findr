import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";

interface MovieDetails {
  title: string;
  overview: string;
  poster_path: string;
}

function Details() {
  const { movie_id } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=3dedd54aedcdc54667f68127d0c931ec&language=en-US`
        );

        if (detailsResponse.ok) {
          const data = await detailsResponse.json();
          setMovieDetails(data);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movie_id]);


  if (loading) {
    return <Loading />;
  }

  if (error || !movieDetails) {
    return <Error />;
  }

  return (
    <div>
      <h1>{movieDetails.title}</h1>
      <p>{movieDetails.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
        alt={movieDetails.title}
      />
    </div>
  );
}

export default Details;
