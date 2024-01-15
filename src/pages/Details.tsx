import { useParams } from "react-router-dom";
import { fetcher } from "../api/fetcher";
import { baseUrl, apiKey } from "../api/config";
import useSWR from "swr";
import useMediaQuery from "../hooks/useMediaQuery";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import BackdropImage from "../components/Details/BackdropImage";
import SimilarMovies from "../components/Details/SimilarMovies";
import Trailer from "../components/Details/Trailer";
import Roles from "../components/Details/Roles";
import Base from "../components/Details/Base";
import Synopsis from "../components/Details/Synopsis";
import Favorite from "../components/Details/Favorite";
import PosterImage from "../components/Details/PosterImage";
import InfoList from "../components/Details/InfoList";

function Details() {
  const isSmallerView = useMediaQuery("(max-width: 786px)");

  const { movie_id } = useParams();

  const { data, error, isLoading } = useSWR(
    `${baseUrl}/movie/${movie_id}?api_key=${apiKey}&language=en-US&append_to_response=credits,videos`,
    fetcher
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <section>
      <BackdropImage backdrop_path={data.backdrop_path} />
      <div className="w-full p-6 pb-11 sm:p-3.5 relative z-0 -mt-[4.688rem] mx-auto max-w-[73.125rem] bg-[--primary-blue] rounded-t-3xl">
        {isSmallerView ? (
          <div className="grid-cols-[minmax(0,1fr)]">
            <div className="flex flex-wrap items-baseline">
              <Base title={data.title} release_date={data.release_date} />
            </div>
            <div className="pt-8">
              <Favorite movie={data} />
            </div>
            <Synopsis overview={data.overview} />
            <Roles credits={data.credits} />
            <Trailer videos={data.videos.results} />
            <InfoList details={data} />
            <PosterImage poster_path={data.poster_path} title={data.title} />
            <div className="similar pt-8">
              <SimilarMovies title={data.title} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[1fr,minmax(0,2fr)]">
            <div className="pr-3.5">
              <div className="mb-4 pb-4 border-b border-gray-900 relative">
                <PosterImage
                  poster_path={data.poster_path}
                  title={data.title}
                />
                <div className="absolute flex justify-center bottom-4 w-full h-10 left-0 right-0 bg-gray-500 text-white rounded-b">
                  <Favorite movie={data} />
                </div>
              </div>
              <InfoList details={data} />
            </div>
            <div className="pl-3.5">
              <div className="flex flex-wrap">
                <Base title={data.title} release_date={data.release_date} />
              </div>
              <Synopsis overview={data.overview} />
              <Roles credits={data.credits} />
              <Trailer videos={data.videos.results} />
              <SimilarMovies title={data.title} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Details;
