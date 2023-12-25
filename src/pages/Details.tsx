import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { MovieDetails, Movie } from "../types";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Card from "../components/Card";
import defaultImgPoster from "../assets/images/defaultImgPoster.jpg";
import defaultBackdropL from "../assets/images/defaultImgBackdrop-large.jpg";
import defaultBackdropS from "../assets/images/defaultImgBackdrop-smaller.jpg";
import { FavoritesContext } from "../context/FavoritesContext";
import { FaBookmark } from "react-icons/fa6";

function Details() {
  const { movie_id } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [isSmallerView, setIsSmallerView] = useState(
    window.matchMedia("(max-width: 786px)").matches
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { favoritesChecker, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US&append_to_response=credits,similar,videos`
        );
        const similarMoviesResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US&page=1`
        );

        if (detailsResponse.ok) {
          const data = await detailsResponse.json();
          setMovieDetails(data);
        } else {
          setError(true);
          return; // Add this to stop further execution if detailsResponse is not ok
        }
        if (similarMoviesResponse.ok) {
          const similarMoviesData = await similarMoviesResponse.json();
          setSimilarMovies(similarMoviesData.results);
        } else {
          console.error("Error fetching similar movies");
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

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setIsSmallerView(e.matches);
    const mediaQuery = window.matchMedia("(max-width: 786px)");
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

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
  const videos = movieDetails.videos?.results;
  const hasTrailer = videos && videos.some((video) => video.type === "Trailer");
  const cast = movieDetails?.credits.cast;

  const detailInfos = [
    { label: "Rating", value: movieDetails.vote_average.toFixed(2) },
    { label: "Popularity", value: movieDetails.popularity.toFixed(2) },
    {
      label: "Genres",
      value: movieDetails.genres.map((genre) => genre.name).join(", "),
    },
    { label: "Runtime", value: `${movieDetails.runtime}'` },
    { label: "Production country", value: productionCountry },
    { label: "Director", value: director?.name },
    {
      label: "Budget",
      value: `${movieDetails.budget.toLocaleString("de-DE")}$`,
    },
    {
      label: "Revenue",
      value: `${movieDetails.revenue.toLocaleString("de-DE")}$`,
    },
  ];

  const movieIdNumber = movie_id ? parseInt(movie_id) : -1;

  const movieForFavorites = {
    id: movieIdNumber,
    poster_path: movieDetails.poster_path,
    title: movieDetails.title,
    release_date: movieDetails.release_date,
    overview: movieDetails.overview,
    movie_id: movieIdNumber,
  };

  return (
    <section>
      <picture>
        <source
          media="(min-width: 781px)"
          srcSet={
            movieDetails.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`
              : defaultBackdropL
          }
        />
        <source
          media="(min-width: 501px) and (max-width: 780px)"
          srcSet={
            movieDetails.backdrop_path
              ? `https://image.tmdb.org/t/p/w780/${movieDetails.backdrop_path}`
              : defaultBackdropS
          }
        />
        <source
          media="(max-width: 500px)"
          srcSet={
            movieDetails.backdrop_path
              ? `https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`
              : defaultBackdropS
          }
        />
        <img
          src={
            movieDetails.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`
              : defaultBackdropL
          }
          alt=""
          className="h-[450px] w-full object-cover md:h-[250px]"
        />
      </picture>
      <div className="w-full p-6 pb-11 sm:p-3.5 relative z-0 min-h-800px -mt-[75px] mx-auto max-w-[1170px] bg-[--primary-blue] rounded-t-3xl">
        {isSmallerView ? (
          <div className="grid-cols-[minmax(0,1fr)]">
            <div className="flex flex-wrap items-baseline">
              <h1>{movieDetails.title}</h1>
              <p className="text-lg pl-2">
                ({movieDetails.release_date.slice(0, 4)})
              </p>
            </div>
            <div className="pt-8">
              {favoritesChecker(movieForFavorites) ? (
                <button
                  onClick={() => removeFromFavorites(movieForFavorites)}
                  className="flex items-center"
                >
                  <span className="font-semibold drop-shadow-[#facc15_1px_0_10px] pr-2">
                    Remove from favorite
                  </span>
                  <FaBookmark className="text-yellow-400" />
                </button>
              ) : (
                <button
                  onClick={() => addToFavorites(movieForFavorites)}
                  className="flex items-center"
                >
                  <span className="font-semibold drop-shadow-[#facc15_1px_0_10px] pr-2">
                    Add to favorite
                  </span>
                  <FaBookmark className="text-gray-300" />
                </button>
              )}
            </div>
            <div className="py-8">
              <h2 className="pb-3.5">Sinopsis</h2>
              <p>{movieDetails.overview || "No data available"}</p>
            </div>
            <div className="pb-8">
              <h2 className="pb-3.5">Cast</h2>
              <ul className="overflow-y-auto max-h-[300px]">
                {cast.length > 0 ? (
                  cast.map((actor) => (
                    <li key={actor.id}>
                      {actor.original_name} as {actor.character}
                    </li>
                  ))
                ) : (
                  <p>No data available</p>
                )}
              </ul>
            </div>
            <div className="pb-8">
              <h2 className="pb-3.5">Trailer</h2>
              {hasTrailer ? (
                <iframe
                  className="w-full aspect-video rounded"
                  src={`https://www.youtube.com/embed/${
                    videos.find((video) => video.type === "Trailer")?.key
                  }`}
                  title="Trailer"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>Trailer not available</p>
              )}
            </div>
            {detailInfos.map((info, index) => (
              <div
                className={`mb-4 pb-4 ${
                  index === detailInfos.length - 1
                    ? ""
                    : "border-b border-gray-900"
                }`}
                key={index}
              >
                <h2 className="pb-2">{info.label}</h2>
                <p>{info.value || "No data available"}</p>
              </div>
            ))}
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                  : defaultImgPoster
              }
              alt={movieDetails.title}
              className="rounded"
            />
            <div className="similar pt-8">
              <h2 className="pb-3.5">
                People who also liked {movieDetails.title}
              </h2>
              <div className=" overflow-x-auto flex flex-nowrap">
                <div className="flex gap-3.5">
                  {similarMovies && similarMovies.length > 0 ? (
                    <Card movies={similarMovies} layout="horizontal" />
                  ) : (
                    <p>No similar movies available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[1fr,minmax(0,2fr)]">
            <div className="pr-3.5">
              <div className="mb-4 pb-4 border-b border-gray-900 relative">
                <img
                  src={
                    movieDetails.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                      : defaultImgPoster
                  }
                  alt={movieDetails.title}
                  className="rounded"
                />
                <div className="absolute flex justify-center bottom-[16px] w-full h-[40px] left-0 right-0 bg-gray-500 text-white rounded-b">
                  {favoritesChecker(movieForFavorites) ? (
                    <button
                      onClick={() => removeFromFavorites(movieForFavorites)}
                      className="flex items-center"
                    >
                      <span className="font-semibold drop-shadow-[#facc15_1px_0_10px] pr-2">
                        Remove from favorite
                      </span>
                      <FaBookmark className="text-yellow-400" />
                    </button>
                  ) : (
                    <button
                      onClick={() => addToFavorites(movieForFavorites)}
                      className="flex items-center"
                    >
                      <span className="font-semibold drop-shadow-[#facc15_1px_0_10px] pr-2">
                        Add to favorite
                      </span>
                      <FaBookmark className="text-gray-300" />
                    </button>
                  )}
                </div>
              </div>
              {detailInfos.map((info, index) => (
                <div className="mb-4 pb-4 border-b border-gray-900" key={index}>
                  <h2 className="pb-2">{info.label}</h2>
                  <p>{info.value || "No data available"}</p>
                </div>
              ))}
            </div>

            <div className="pl-3.5">
              <div className="flex flex-wrap">
                <h1>{movieDetails.title}</h1>
                <p className="text-lg pl-2">
                  ({movieDetails.release_date.slice(0, 4)})
                </p>
              </div>
              <div className="py-8">
                <h2 className="pb-3.5">Sinopsis</h2>
                <p>{movieDetails.overview || "No data available"}</p>
              </div>
              <div className="pb-8">
                <h2 className="pb-3.5">Cast</h2>
                <ul className="overflow-y-auto max-h-[300px]">
                  {cast.length > 0 ? (
                    cast.map((actor) => (
                      <li key={actor.id}>
                        {actor.original_name} as {actor.character}
                      </li>
                    ))
                  ) : (
                    <p>No data available</p>
                  )}
                </ul>
              </div>

              <div className="pb-8">
                <h2 className="pb-3.5">Trailer</h2>
                {hasTrailer ? (
                  <iframe
                    className="w-full aspect-video rounded"
                    src={`https://www.youtube.com/embed/${
                      videos.find((video) => video.type === "Trailer")?.key
                    }`}
                    title="Trailer"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p>Trailer not available</p>
                )}
              </div>
              <h2 className="pb-3.5">
                People who also liked {movieDetails.title}
              </h2>
              <div className=" overflow-x-auto flex flex-nowrap">
                <div className="flex gap-3.5">
                  {similarMovies && similarMovies.length > 0 ? (
                    <Card movies={similarMovies} layout="horizontal" />
                  ) : (
                    <p>No similar movies available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Details;

