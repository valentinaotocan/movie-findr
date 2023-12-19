import { Link, useLocation } from "react-router-dom";
import { Movie } from "../types";

function SearchResults()  {
  const { state } = useLocation();
  console.log(state);
  
  if (!state || !Array.isArray(state.suggestion)) {
    return <p>No results found.</p>;
  }

  return (
    <div>
      <p>Search results for: {state.searchTerm}</p>
      {state.suggestion.map((item: Movie) => (
        <div className="w-[190px] h-[270px] flex-shrink-0" key={item.id}>
          <Link to={`/details/${item.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt={item.title}
              className="rounded"
            />
            <p>{item.title}</p>
            <p>{new Date(item.release_date).getFullYear()}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

