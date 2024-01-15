import useSWR from "swr";
import { fetcher } from "../api/fetcher";
import { baseUrl, apiKey } from "../api/config";
import { Genre } from "../types";

function useFetchGenres() {
  const { data } = useSWR<{ genres: Genre[] }>(
    `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en`,
    fetcher
  );

  return {
    genres: data?.genres || [],
  };
}

export default useFetchGenres;
