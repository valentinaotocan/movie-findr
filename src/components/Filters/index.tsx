import { useState } from "react";
import { FaFilter, FaUndo } from "react-icons/fa";
import useFetchMovies from "../../hooks/useFetchMovies";
import useFetchGenres from "../../hooks/useFetchGenres";
import queryParams from "./queryParams";
import SortBy from "./SortBy";
import Year from "./Year";
import Genre from "./Genres";
import Runtime from "./Runtime";
import Rating from "./Rating";
import Loading from "../common/Loading";
import Error from "../common/Error";
import Card from "../common/Cards";

function Filters() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    selectedSortBy: "popularity",
    selectedYear: null,
    selectedGenres: [],
    selectedRuntime: null,
    selectedRating: null,
  });

  const { movies, isLoading, error } = useFetchMovies(
    "/discover/movie/",
    queryParams(filters)
  );

  const { genres } = useFetchGenres();

  const updateFilters = (newFilters: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleResetAll = () => {
    setFilters({
      selectedSortBy: "popularity",
      selectedYear: null,
      selectedGenres: [],
      selectedRuntime: null,
      selectedRating: null,
    });
    setOpenDropdown(null);
  };

  return (
    <section>
      <div className="flex gap-10 mt-6 mx-[6%] md:mx-0 md:px-[0.938rem] md:py-6 bg-gray-900 rounded h-[2.625rem] items-center pl-1 md:items-start md:flex-col md:h-full">
        <div className="md:flex md:w-full md:justify-between">
          <div className="flex items-center">
            <FaFilter />
            <h2 className="pl-3.5">Filters:</h2>
          </div>
          <div onClick={handleResetAll} className="hidden md:block text-right md:flex md:items-center">
            <span className="pr-1 text-xs">
              <FaUndo />
            </span>
            Reset
          </div>
        </div>

        <div className="relative">
          <Year
            selectedValue={filters.selectedYear}
            onChange={(year) => updateFilters({ selectedYear: year })}
            isOpen={openDropdown === "yearDropdown"}
            toggleDropdown={() => toggleDropdown("yearDropdown")}
          />
        </div>
        <div className="relative">
          <Genre
            genres={genres}
            selectedValue={filters.selectedGenres}
            onChange={(updatedGenres) =>
              updateFilters({ selectedGenres: updatedGenres })
            }
            isOpen={openDropdown === "genreDropdown"}
            toggleDropdown={() => toggleDropdown("genreDropdown")}
          />
        </div>
        <div className="relative">
          <Runtime
            selectedValue={filters.selectedRuntime}
            onChange={(runtime) => updateFilters({ selectedRuntime: runtime })}
            isOpen={openDropdown === "runtimeDropdown"}
            toggleDropdown={() => toggleDropdown("runtimeDropdown")}
          />
        </div>
        <div className="relative">
          <Rating
            selectedValue={filters.selectedRating}
            onChange={(rating) => updateFilters({ selectedRating: rating })}
            isOpen={openDropdown === "ratingDropdown"}
            toggleDropdown={() => toggleDropdown("ratingDropdown")}
          />
        </div>

        <button
          onClick={handleResetAll}
          className="md:hidden ml-auto pr-2 flex items-center"
        >
          <span className="pr-1 text-xs">
            <FaUndo />
          </span>
          Reset
        </button>
      </div>

      <SortBy
        selectedSortBy={filters.selectedSortBy}
        handleSortBy={(value) => updateFilters({ selectedSortBy: value })}
      />

      <div className="px-custom md:bg-gray-900 md:pb-6 md:rounded-b">
        {isLoading && <Loading />}
        {error && <Error />}
        {!isLoading && !error && movies.length === 0 && (
          <div className="text-yellow-500">
            No results found for the selected filters.
          </div>
        )}
        <div className="grid gap-3.5 grid-cols-[repeat(auto-fill,minmax(10.625rem,1fr))] max-h-[31.25rem] overflow-y-scroll md:md:bg-gray-900">
          <Card movies={movies} layout="vertical" />
        </div>
      </div>
    </section>
  );
}

export default Filters;
