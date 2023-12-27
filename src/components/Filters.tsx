import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import useFetchMovies from "../hooks/useFetchMovies";
import useFetchGenres from "../hooks/useFetchGenres";
import FilterSortBy from "./FilterSortBy";
import FilterYear from "./FilterYear";
import FilterGenre from "./FilterGenre";
import FilterRuntime from "./FilterRuntime";
import FilterRating from "./FilterRating";
import Loading from "./Loading";
import Error from "./Error";
import Card from "./Card";

function Filters() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedSortBy, setSelectedSortBy] = useState<string>("popularity");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedRuntime, setSelectedRuntime] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const genreQueryParam = (genres: number[]) => {
    return genres.length > 0 ? { with_genres: genres.join(",") } : {};
  };

  const runtimeQueryParam = (runtime: number) => {
    if (runtime === 60) return { "with_runtime.lte": 60 };
    if (runtime === 120)
      return { "with_runtime.lte": 120, "with_runtime.gte": 61 };
    if (runtime > 120) return { "with_runtime.gte": 121 };
    return {};
  };

  const ratingQueryParam = (rating: number) => {
    if (rating === 0) return {};
    if (rating === 5) return { "vote_average.lte": 5 };
    if (rating === 5.1) return { "vote_average.gte": 5.1 };
    if (rating === 9) return { "vote_average.gte": 9 };
    return {};
  };

  const { movies, isLoading, error } = useFetchMovies("/discover/movie/", {
    sort_by: `${selectedSortBy}.desc`,
    ...(selectedYear !== null && { year: selectedYear }),
    ...genreQueryParam(selectedGenres),
    ...(selectedRuntime !== null ? runtimeQueryParam(selectedRuntime) : {}),
    ...(selectedRating !== null ? ratingQueryParam(selectedRating) : {}),
  });

  const { genres } = useFetchGenres({ endpoint: "/genre/movie/list" });

  const toggleDropdown = (dropdownName: string) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownName);
    }
  };
  const handleSortBy = (value: string) => {
    setSelectedSortBy(value);
  };

  const onYearChange = (year: number | null) => {
    setSelectedYear(year);
  };

  const onRuntimeChange = (runtime: number | null) => {
    setSelectedRuntime(runtime);
  };

  const onRatingChange = (rating: number | null) => {
    setSelectedRating(rating);
  };

  const handleResetAll = () => {
    setSelectedSortBy("popularity");
    setSelectedYear(null);
    setSelectedGenres([]);
    setSelectedRuntime(null);
    setSelectedRating(null);
    setOpenDropdown(null);
  };

  return (
    <section>
      <div className="flex gap-10 mt-6 mx-[6%] md:mx-0 md:px-[15px] md:py-[24px] bg-gray-900 rounded h-[2.625rem] items-center pl-1 md:items-start md:flex-col md:h-full">
        <div className="md:flex md:w-full md:justify-between">
          <div className="flex items-center">
            <FaFilter />
            <h2 className="pl-3.5">Filters:</h2>
          </div>
          <div onClick={handleResetAll} className="hidden md:block text-right">
            Reset
          </div>
        </div>

        <div className="relative">
          <FilterYear
            selectedYear={selectedYear}
            onYearChange={onYearChange}
            isOpen={openDropdown === "yearDropdown"}
            toggleDropdown={() => toggleDropdown("yearDropdown")}
          />
        </div>
        <div className="relative inline-block">
          <FilterGenre
            genres={genres}
            selectedGenres={selectedGenres}
            onGenreChange={setSelectedGenres}
            isOpen={openDropdown === "genreDropdown"}
            toggleDropdown={() => toggleDropdown("genreDropdown")}
          />
        </div>
        <div className="relative inline-block">
          <FilterRuntime
            selectedRuntime={selectedRuntime}
            onRuntimeChange={onRuntimeChange}
            isOpen={openDropdown === "runtimeDropdown"}
            toggleDropdown={() => toggleDropdown("runtimeDropdown")}
          />
        </div>
        <div className="relative inline-block">
          <FilterRating
            selectedRating={selectedRating}
            onRatingChange={onRatingChange}
            isOpen={openDropdown === "ratingDropdown"}
            toggleDropdown={() => toggleDropdown("ratingDropdown")}
          />
        </div>
        <button onClick={handleResetAll} className="md:hidden ml-auto pr-2">
          Reset
        </button>
      </div>

      <FilterSortBy
        selectedSortBy={selectedSortBy}
        handleSortBy={handleSortBy}
      />

      <div className="px-custom md:bg-gray-900 md:pb-[24px] md:rounded-b">
        {isLoading && <Loading />}
        {error && <Error />}
        {!isLoading && !error && movies.length === 0 && (
          <div className="text-yellow-500">
            No results found for the selected filters.
          </div>
        )}
        <div className="grid gap-3.5 grid-cols-[repeat(auto-fill,minmax(170px,1fr))] max-h-[500px] overflow-y-scroll md:md:bg-gray-900">
          <Card movies={movies} layout="vertical" />
        </div>
      </div>
    </section>
  );
}
export default Filters;
