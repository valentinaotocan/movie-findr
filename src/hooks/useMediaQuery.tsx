import { useState, useEffect } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
    
  }, [query]);

  return matches;
}

export default useMediaQuery;
