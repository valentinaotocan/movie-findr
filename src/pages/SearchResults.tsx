import { useNavigate, useLocation } from "react-router-dom";
import Cards from "../components/common/Cards";
import { Movie } from "../types";

function SearchResults() {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <section className="px-custom pt-2 pb-6">
      <p className="pb-4">Search results for: {state.searchTerm}</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(10.625rem,1fr))] gap-4">
        {state.suggestion.map((item: Movie) => (
          <div
            role="button"
            onClick={() => navigate(`/details/${item.id}`)}
            key={item.id}
            className="cursor-pointer h-[19.563rem]"
          >
            <Cards movies={[item]} layout="vertical" height="h-[16.875rem]" />
            <div className="flex flex-col align-items">
              <p className="truncate">{item.title}</p>
              <p>
                {item.release_date
                  ? new Date(item.release_date).getFullYear()
                  : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SearchResults;
