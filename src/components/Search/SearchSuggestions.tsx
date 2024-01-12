import { Link } from "react-router-dom";
import { SearchSuggestionsProps } from "../../types";
import useMediaQuery from "../../hooks/useMediaQuery";
import Loading from "../common/Loading";
import Error from "../common/Error";

function SearchSuggestions({ isLoading, error, suggestionsWithImg, handleSelect, handleSeeAllResults, searchTerm }: SearchSuggestionsProps) {
  const isSmallerView = useMediaQuery("(max-width: 842px)");
  const sliceEnd = isSmallerView ? 4 : 6;

  return (
    <>
      <div className="flex flex-wrap gap-5">
        {isLoading && <Loading />}
        {error && <Error />}
        {!isLoading && !error && suggestionsWithImg.length === 0 ? (
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
                <p>
                  {item.release_date
                    ? new Date(item.release_date).getFullYear()
                    : "N/A"}
                </p>
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
          <p className="mt-3.5 text-center hover:text-yellow-400">
            See all results
          </p>
        </Link>
      )}
    </>
  );
}

export default SearchSuggestions;
