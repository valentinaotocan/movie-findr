import { GiCheckMark } from "react-icons/gi";
import DropdownButton from "../common/DropdownButton";
import LabelReset from "./LabelReset";
import { GenreProps } from "../../types";
import TriangleSharp from "./TriangleSharp";

function Genres({
  genres,
  selectedValue,
  onChange,
  isOpen,
  toggleDropdown,
}: GenreProps) {
  const handleGenreSelect = (genreId: number) => {
    const isAlreadySelected = selectedValue.includes(genreId);
    const updatedGenres = isAlreadySelected
      ? selectedValue.filter((id) => id !== genreId)
      : [...selectedValue, genreId];
    onChange(updatedGenres);
  };

  const handleReset = () => {
    onChange([]);
  };

  const label = "Genres";

  return (
    <>
      <DropdownButton isOpen={isOpen} label={label} toggle={toggleDropdown} />
      {isOpen && (
        <>
          <TriangleSharp />
          <div className="absolute z-10 p-3.5 text-gray-300 rounded bg-gray-600 mt-1 w-[18.125rem] top-[2.25rem] md:bg-opacity-90 md:w-[15.625rem] md:h-[8.125rem] md:overflow-y-scroll">
            <LabelReset label={label} onReset={handleReset} />
            <div className="grid grid-cols-2 gap-x-2.5 gap-3 md:grid-cols-1">
              {genres.map((genre) => (
                <div
                  key={genre.id}
                  onClick={() => handleGenreSelect(genre.id)}
                  className={`cursor-pointer flex items-center ${
                    selectedValue.includes(genre.id)
                      ? "font-semibold text-yellow-400"
                      : ""
                  }`}
                >
                  <GiCheckMark
                    className={
                      selectedValue.includes(genre.id)
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

export default Genres;
