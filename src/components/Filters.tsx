import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import useFetchMovies from "../hooks/useFetchMovies";
import useFetchGenres from "../hooks/useFetchGenres";
import Card from "./Card";
import FilterSortBy from "./FilterSortBy";
import FilterYear from "./FilterYear";
import Loading from "./Loading";
import Error from "./Error";
import FilterGenre from "./FilterGenre";

function Filters() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedSortBy, setSelectedSortBy] = useState<string>("popularity");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const { movies, loading, error } = useFetchMovies("/discover/movie", {
    sort_by: `${selectedSortBy}.desc`,
    ...(selectedYear !== null && { year: selectedYear }),
    ...(selectedGenre !== null && { with_genres: selectedGenre }),
  });
  
  const { genres } = useFetchGenres({ endpoint: "/genre/movie/list" });
  
  if (loading) {
    return <Loading />;
  }
  
  if (error) {
    return <Error />;
  }
  
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

  return (
    <section>
      <div className="flex gap-3.5 mt-6 mx-[6%] bg-gray-900 rounded h-[2.625rem] items-center pl-1">
        <div className="flex items-center">
          <FaFilter />
          <h2 className="pl-1.5">Filters:</h2>
        </div>
        <div className="relative inline-block text-left">
          <FilterYear
            selectedYear={selectedYear}
            onYearChange={onYearChange}
            isOpen={openDropdown === "yearDropdown"}
            toggleDropdown={() => toggleDropdown("yearDropdown")}
          />
        </div>
        <div className="relative inline-block text-left">
          <FilterGenre
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            isOpen={openDropdown === "genreDropdown"}
            toggleDropdown={() => toggleDropdown("genreDropdown")}
          />
        </div>
      </div>

      <FilterSortBy
        selectedSortBy={selectedSortBy}
        handleSortBy={handleSortBy}
      />

      <div className="px-custom">
        {selectedSortBy && (
          <div className="grid gap-3.5 grid-cols-[repeat(auto-fill,minmax(170px,1fr))] max-h-[500px] overflow-y-scroll">
            <Card movies={movies} layout="vertical" />
          </div>
        )}
      </div>
    </section>
  );
}
export default Filters;
