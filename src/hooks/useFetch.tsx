import { useState, useEffect } from "react";
import { Movie } from "../types";

function useFetch(endpoint: string, params = {}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(params);
      const response = await fetch(
        `https://api.themoviedb.org/3${endpoint}?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&include_adult=false&page=1&${queryParams}`
      );
      if (response.ok) {
        const data = await response.json();
        setMovies(data.results);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return { movies, loading, error };
}
export default useFetch;
