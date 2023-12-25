import { FilterSortByProps } from "../types";

function FilterSortBy({ selectedSortBy, handleSortBy }: FilterSortByProps) {
  return (
    <div className="px-custom flex items-center my-3">
      <p className="pr-2">Sort by:</p>
      <select
        value={selectedSortBy}
        onChange={(e) => handleSortBy(e.target.value)}
        className="rounded bg-gray-800 p-1"
      >
        <option value="popularity">Most popular first</option>
        <option value="vote_average">Highest rated first</option>
        <option value="primary_release_date">Newest first</option>
      </select>
    </div>
  );
}

export default FilterSortBy;
