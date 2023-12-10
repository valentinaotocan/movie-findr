import { Link } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import { SearchSuggestionsProps } from "../types";

function SearchSuggestions({
  loading,
  error,
  suggestionsWithImg,
  handleSelect,
  handleSeeAllResults,
  searchTerm,
}: SearchSuggestionsProps) {
  return (
    <>
      <div className="flex flex-wrap gap-5">
        {loading && <Loading />}
        {error && <Error />}
        {suggestionsWithImg.length === 0 ? (
          <p>Try something else.</p>
        ) : (
          suggestionsWithImg.slice(0, 6).map((item) => (
            <Link
              to={`/details/${item.id}`}
              className="flex flex-col max-w-[9rem] items-center text-center"
              key={item.id}
              onClick={() => handleSelect(item.title)}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt={item.title}
                className="h-24 w-16 rounded"
              />
              <p>{item.title}</p>
              <p>{new Date(item.release_date).getFullYear()}</p>
            </Link>
          ))
        )}
      </div>
      {suggestionsWithImg.length > 4 && (
        <Link
          to="/results"
          state={{ suggestion: suggestionsWithImg, searchTerm: searchTerm }}
          onClick={handleSeeAllResults}
          className="text-center"
        >
          See all results
        </Link>
      )}
    </>
  );
}

export default SearchSuggestions;
