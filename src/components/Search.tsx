import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "../types";
import debounce from "lodash.debounce";
import SearchInput from "./SearchInput";
import SearchSuggestions from "./SearchSuggestions";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestion] = useState<Movie[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const autocomplete = useMemo(
    () =>
      debounce(async (input) => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${
              import.meta.env.VITE_API_KEY
            }&query=${input}`
          );
          if (response.ok) {
            const data = await response.json();
            setSuggestion(data.results);
          } else {
            setError(true);
          }
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }, 400),
    []
  );

   useEffect(() => {
     return () => {
       autocomplete.cancel();
     };
   }, [autocomplete]);
  
  useEffect(() => {
    setError(false);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    autocomplete(value);
    setShowSuggestions(value !== "");
  };

  const handleSelect = (selectedItem: string) => {
    setSearchTerm(selectedItem);
    setSuggestion([]);
    setShowSuggestions(false);
    navigate("/details");
  };

   const handleClear = () => {
     setSearchTerm("");
     setSuggestion([]);
     setShowSuggestions(false);
   };

  const handleSeeAllResults = () => {
    setShowSuggestions(false);
  };

  const suggestionsWithImg = suggestion.filter((item) => item.poster_path);

  return (
    <>
      <form className="w-full" autoComplete="off">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <SearchInput
            searchTerm={searchTerm}
            onChange={handleInputChange}
            onClear={handleClear}
          />
          <div
            className={`${
              showSuggestions ? "bg-gray-900" : "hidden"
            } w-full rounded absolute z-20 py-3.5 px-4 mt-3`}
          >
            <SearchSuggestions
              loading={loading}
              error={error}
              searchTerm={searchTerm}
              suggestionsWithImg={suggestionsWithImg}
              handleSelect={handleSelect}
              handleSeeAllResults={handleSeeAllResults}
            />
          </div>
        </div>
      </form>
    </>
  );
}
export default Search;
