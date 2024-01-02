import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../api/fetcher";
import { Movie } from "../../types";
import debounce from "lodash.debounce";
import SearchInput from "./SearchInput";
import SearchSuggestions from "./SearchSuggestions";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  const { data, error, isLoading } = useSWR(
    debouncedTerm
      ? `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&query=${debouncedTerm}`
      : null,
    fetcher
  );

  const autocomplete = useMemo(
    () =>
      debounce((value) => {
        setDebouncedTerm(value);
        setIsTyping(false);
      }, 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsTyping(true);
    autocomplete(value);
    setShowSuggestions(value !== "");
  };

  const handleSelect = (selectedItem: string) => {
    setSearchTerm(selectedItem);
    setShowSuggestions(false);
    navigate("/details");
  };

  const handleClear = () => {
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const handleSeeAllResults = () => {
    setShowSuggestions(false);
  };

  const suggestionsWithImg =
    data?.results.filter((item: Movie) => item.poster_path) || [];

  return (
    <>
      <form
        className="w-full"
        autoComplete="off"
        onSubmit={(e) => e.preventDefault}
      >
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
              isLoading={isLoading || isTyping}
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
