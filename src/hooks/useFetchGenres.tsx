import { useState, useEffect } from "react";

interface Genre {
  id: number;
  name: string;
}

interface UseFetchGenresProps {
  endpoint: string;
}

function useFetchGenres({ endpoint }: UseFetchGenresProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3${endpoint}?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      if (response.ok) {
        const data = await response.json();
        setGenres(data.genres);
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
  }, [endpoint]);

  return { genres, loading, error };
}

export default useFetchGenres;
