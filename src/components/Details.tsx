import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";

interface MovieDetails {
  backdrop_path: string;
  budget: number;
  revenue: number;
  genres: {
    name: string;
  }[];
  overview: string;
  popularity: number;
  poster_path: string;
  production_countries: {
    name: string;
  }[];
  release_date: string;
  runtime: number;
  title: string;
  vote_average: number;
  credits: {
    cast: {
      original_name: string;
      character: string;
      id: number;
    }[];
    crew: {
      name: string;
      job: string;
    }[];
    similar: {
      results: {
        poster_path: string;
      }[];
    };
    videos: {
      results: {
        key: string;
        site: string;
        type: string;
        id: string;
      }[];
    };
  };
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
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US&append_to_response=credits,similar,videos`
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

  const director = movieDetails.credits.crew.find(
    (member) => member.job === "Director"
  );

  const productionCountry = movieDetails.production_countries
    ?.map((country) => country.name)
    .join(", ");

  const videos = movieDetails.videos.results;

  const cast = movieDetails?.credits.cast;

  return (
    <section>
      <img
        src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
        alt=""
        className="h-[450px] w-full object-cover md:h-[350px]"
      />
      <div className="w-full p-6 relative z-0 min-h-800px -mt-[75px] mx-auto max-w-[1170px] bg-[--primary-blue] rounded-t-3xl">
        <div className="grid grid-cols-[1fr,minmax(0,2fr)]">
          <div className="pr-3.5">
            <div className="detail-infos">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className=" rounded"
              />
            </div>
            <div className="detail-infos">
              <h3 className="pb-2">Rating</h3>
              <p>{movieDetails.vote_average}</p>
            </div>
            <div className="detail-infos">
              <h3 className="pb-2">Popularity</h3>
              <p>{movieDetails.popularity}</p>
            </div>
            <div className="detail-infos">
              <h3 className="pb-2">Genres</h3>
              <p>{movieDetails.genres.map((genre) => genre.name).join(", ")}</p>
            </div>
            <div className="detail-infos">
              <h3 className="pb-2">Runtime</h3>
              <p>{movieDetails.runtime}'</p>
            </div>
            <div className="detail-infos">
              <h3>Production country</h3>
              <p>{productionCountry}</p>
            </div>
            <div className="detail-infos">
              <h3 className="pb-2">Director</h3>
              <p>{director?.name}</p>
            </div>
            <div className="detail-infos">
              <h3 className="pb-2">Budget</h3>
              <p>{movieDetails.budget}$</p>
            </div>
            <div className="detail-infos">
              <h3 className="pb-2">Revenue</h3>
              <p>{movieDetails.revenue}$</p>
            </div>
          </div>

          <div className="pl-3.5">
            <div className="flex">
              <h1>{movieDetails.title}</h1>
              <p>({movieDetails.release_date.slice(0, 4)})</p>
            </div>
            <p>{movieDetails.overview}</p>
            <h2>Cast:</h2>
            <ul>
              {cast.map((actor) => (
                <li key={actor.id}>
                  {actor.original_name} as {actor.character}
                </li>
              ))}
            </ul>
            <div>
              <ul>
                {videos.map((video, index) => (
                  <li key={index}>
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={`Video ${index + 1}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;
