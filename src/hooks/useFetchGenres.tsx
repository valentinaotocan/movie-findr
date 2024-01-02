import useSWR from "swr";
import { fetcher } from "../api/fetcher";
import { Genre } from "../types";
import { UseFetchGenresProps } from "../types";
import { baseUrl, apiKey } from "../api/config";

function useFetchGenres({ endpoint }: UseFetchGenresProps) {
  const { data } = useSWR<{ genres: Genre[] }>(
    `${baseUrl}${endpoint}?api_key=${apiKey}`,
    fetcher
  );

  return {
    genres: data?.genres || [],
  };
  
}

export default useFetchGenres;
