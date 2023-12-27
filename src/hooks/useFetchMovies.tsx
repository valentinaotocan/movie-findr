import useSWR from "swr";
import { fetcher } from "../api/fetcher";
import { Movie } from "../types";

function useFetchMovies(endpoint: string, params = {}) {
  const queryParams = new URLSearchParams(params).toString();
  const url = `https://api.themoviedb.org/3${endpoint}?api_key=${
    import.meta.env.VITE_API_KEY
  }&${queryParams}`;

  const { data, error, isLoading } = useSWR<{ results: Movie[] }>(url, fetcher);

  return { movies: data?.results || [], isLoading: isLoading, error: error };

}
export default useFetchMovies;
