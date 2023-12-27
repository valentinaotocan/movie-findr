import useSWR from "swr";
import { fetcher } from "../api/fetcher";
import { Genre } from "../types";
import { UseFetchGenresProps } from "../types";

function useFetchGenres({ endpoint }: UseFetchGenresProps) {
  const { data } = useSWR<{ genres: Genre[] }>(
    `https://api.themoviedb.org/3${endpoint}?api_key=${
      import.meta.env.VITE_API_KEY
    }`,
    fetcher
  );

  return {
    genres: data?.genres || [],
  };
}

export default useFetchGenres;
