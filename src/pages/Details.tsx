import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../api/fetcher";
import { baseUrl, apiKey } from "../api/config";
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
import InfoLists from "../components/Details/InfoLists";

function Details() {
  const [isSmallerView, setIsSmallerView] = useState(
    window.matchMedia("(max-width: 786px)").matches
  );

  const { movie_id } = useParams();

  const { data, error, isLoading } = useSWR(
    `${baseUrl}/movie/${movie_id}?api_key=${apiKey}&language=en-US&append_to_response=credits,videos`,
    fetcher
  );

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setIsSmallerView(e.matches);
    const mediaQuery = window.matchMedia("(max-width: 786px)");
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <section>
      <BackdropImage backdrop_path={data?.backdrop_path || null} />
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
            <InfoLists details={data} borderLastItem={true} />
            <PosterImage {...data} />
            <div className="similar pt-8">
              <SimilarMovies />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[1fr,minmax(0,2fr)]">
            <div className="pr-3.5">
              <div className="mb-4 pb-4 border-b border-gray-900 relative">
                <PosterImage {...data} />
                <div className="absolute flex justify-center bottom-4 w-full h-10 left-0 right-0 bg-gray-500 text-white rounded-b">
                  <Favorite movie={data} />
                </div>
              </div>
              <InfoLists details={data} borderLastItem={false} />
            </div>
            <div className="pl-3.5">
              <div className="flex flex-wrap">
                <Base title={data.title} release_date={data.release_date} />
              </div>
              <Synopsis overview={data.overview} />
              <Roles credits={data.credits} />
              <Trailer videos={data.videos.results} />
              <SimilarMovies />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Details;
