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

  const smallerView = window.matchMedia('(max-width: 842px)').matches;
  const sliceEnd = smallerView ? 4 : 6;

  return (
    <>
      <div className="flex flex-wrap gap-5">
        {loading && <Loading />}
        {error && <Error />}
        {!loading && !error && suggestionsWithImg.length === 0 ? (
          <p className="text-yellow-400">
            The searched term does not exist. Please try something else.
          </p>
        ) : (
          suggestionsWithImg.slice(0, sliceEnd).map((item) => (
            <Link
              to={`/details/${item.id}`}
              className="flex items-center hover:bg-yellow-400 hover:rounded hover:text-black border-solid border rounded border-gray-600"
              key={item.id}
              onClick={() => handleSelect(item.title)}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt={item.title}
                className="h-24 w-16 rounded"
              />
              <div className="flex flex-col px-2.5 w-[5rem]">
                <p className="truncate">{item.title}</p>
                <p>{new Date(item.release_date).getFullYear()}</p>
              </div>
            </Link>
          ))
        )}
      </div>
      {suggestionsWithImg.length > 4 && (
        <Link
          to="/results"
          state={{ suggestion: suggestionsWithImg, searchTerm: searchTerm }}
          onClick={handleSeeAllResults}
        >
          <p className="mt-3.5 text-center">See all results</p>
        </Link>
      )}
    </>
  );
}

export default SearchSuggestions;
