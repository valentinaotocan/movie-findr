import { SortByProps } from "../../types";
function SortBy({ selectedSortBy, handleSortBy }: SortByProps) {
  return (
    <>
      <div className="px-custom flex items-center my-3 md:bg-gray-900 md:my-0 md:pb-6">
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
    </>
  );
}

export default SortBy;
