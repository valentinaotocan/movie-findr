import { IoTriangleSharp } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { GiCheckMark } from "react-icons/gi";
import { FilterGenreProps } from "../types";

function FilterGenre({
  genres,
  selectedGenres,
  onGenreChange,
  isOpen,
  toggleDropdown,
}: FilterGenreProps) {

   const handleGenreSelect = (genreId: number) => {
     const isAlreadySelected = selectedGenres.includes(genreId);
     const updatedGenres = isAlreadySelected
       ? selectedGenres.filter((id) => id !== genreId)
       : [...selectedGenres, genreId]; 
     onGenreChange(updatedGenres); 
   };

  const handleReset = () => {
    onGenreChange([]); 
  };

  return (
    <>
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex items-center"
      >
        Genres{" "}
        {isOpen ? (
          <FaAngleUp className="ml-2" />
        ) : (
          <FaAngleDown className="ml-2" />
        )}
      </button>
      {isOpen && (
        <>
          <IoTriangleSharp className="absolute z-10 text-gray-600 top-[26px] ml-[50%] md:text-opacity-90" />
          <div className="absolute z-10 p-3.5 text-gray-300 rounded bg-gray-600 mt-1 w-[290px] top-[36px] md:bg-opacity-90 md:w-[250px] md:h-[130px] md:overflow-y-scroll">
            <div className="flex justify-between pb-3">
              <p>Genres</p>
              <button onClick={handleReset}>Reset</button>
            </div>
            <div className="grid grid-cols-2 gap-x-2.5 gap-3 md:grid-cols-1">
              {genres.map((genre) => (
                <div
                  key={genre.id}
                  onClick={() => handleGenreSelect(genre.id)}
                  className={`cursor-pointer flex items-center ${
                    selectedGenres.includes(genre.id)
                      ? "font-semibold text-yellow-400"
                      : ""
                  }`}
                >
                  <GiCheckMark
                    className={
                      selectedGenres.includes(genre.id)
                        ? "text-yellow-400"
                        : "text-gray-700"
                    }
                  />
                  <p className="pl-1">{genre.name}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FilterGenre;
