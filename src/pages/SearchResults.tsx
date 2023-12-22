import { Link, useLocation } from "react-router-dom";
import { Movie } from "../types";
import Card from "../components/Card";

function SearchResults() {
  const { state } = useLocation();

  return (
    <div className="px-custom pt-2 pb-6">
      <p className="pb-4">Search results for: {state.searchTerm}</p>
      <div className="flex flex-wrap gap-4 justify-center">
        {state.suggestion.map((item: Movie) => (
          <Link to={`/details/${item.id}`}>
            <div key={item.id} className="w-[11.875rem]">
              <Card movies={[item]} />
              <div className="flex flex-col align-items">
                <p className="truncate">{item.title}</p>
                <p>{new Date(item.release_date).getFullYear()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
