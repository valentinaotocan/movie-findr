import { IoTriangleSharp } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

interface FilterGenreProps {
  genres: { id: number; name: string }[];
  selectedGenre: number | null;
  onGenreChange: (genreId: number | null) => void;
  isOpen: boolean;
  toggleDropdown: () => void;
}

function FilterGenre({
  genres,
  selectedGenre,
  onGenreChange,
  isOpen,
  toggleDropdown,
}: FilterGenreProps) {
  const handleGenreSelect = (genreId: number) => {
    onGenreChange(genreId); // Notify parent component about the genre change
  };

  const handleReset = () => {
    onGenreChange(null); // Reset the genre selection
  };

  return (
    <>
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex items-center"
      >
        Genres <FaAngleDown className="ml-2" />
      </button>
      {isOpen && (
        <>
          <IoTriangleSharp className="absolute z-10 text-gray-900 -mb-[3px] ml-[50%]" />
          <div className="absolute z-10 p-3.5 rounded bg-gray-900 mt-1 w-[250px]">
            <div className="flex justify-between pb-3">
              <p>Genres</p>
              <button onClick={handleReset}>Reset</button>
            </div>
            <div className="grid grid-cols-[50%50%] gap-x-2.5 gap-3">
              {genres.map((genre) => (
                <div
                  key={genre.id}
                  onClick={() => handleGenreSelect(genre.id)}
                  className={`cursor-pointer ${
                    selectedGenre === genre.id ? "font-semibold" : ""
                  }`}
                >
                  {genre.name}
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
