import useSWR from "swr";
import { fetcher } from "../api/fetcher";
import { baseUrl, apiKey } from "../api/config";
import { Movie } from "../types";

function useFetchMovies(endpoint: string, params = {}) {
  const queryParams = new URLSearchParams(params).toString();
  
  const url = `${baseUrl}${endpoint}?api_key=${apiKey}&${queryParams}`;

  const { data, error, isLoading } = useSWR<{ results: Movie[] }>(url, fetcher);

  return { movies: data?.results || [], isLoading: isLoading, error: error };
}

export default useFetchMovies;
