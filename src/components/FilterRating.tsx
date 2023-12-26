import { IoTriangleSharp } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FilterRatingProps } from "../types";
import { GiCheckMark } from "react-icons/gi";

function FilterRating({
  selectedRating,
  onRatingChange,
  isOpen,
  toggleDropdown,
}: FilterRatingProps) {

  const ratingOptions = [
    { id: 1, label: "No rating", value: 0 },
    { id: 2, label: "Less or equal to 5", value: 5 },
    { id: 3, label: "Greater or equal to 5.1", value: 5.1 },
    { id: 4, label: "Greater or equal to 9", value: 9 },
  ];

  const handleReset = () => {
    onRatingChange(null);
  };

  return (
    <>
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex items-center"
      >
        Rating
        {isOpen ? (
          <FaAngleUp className="ml-2" />
        ) : (
          <FaAngleDown className="ml-2" />
        )}
      </button>
      {isOpen && (
        <>
          <IoTriangleSharp className="absolute z-10 text-gray-600 top-[26px] -mb-[3px] ml-[50%] md:text-opacity-90" />
          <div className="absolute z-10 p-3.5 rounded text-gray-300 bg-gray-600 mt-1 top-[36px] w-[220px] md:bg-opacity-90">
            <div className="flex justify-between pb-3">
              <p>Rating</p>
              <button onClick={handleReset}>Reset</button>
            </div>
            <div className="flex flex-col gap-3">
              {ratingOptions.map((rating) => (
                <div
                  key={rating.id}
                  className={`cursor-pointer w-full text-left flex items-center ${
                    selectedRating === rating.value
                      ? "text-yellow-400 font-semibold"
                      : ""
                  }`}
                  onClick={() => onRatingChange(rating.value)}
                >
                  <GiCheckMark
                    className={
                      selectedRating === rating.value
                        ? "text-yellow-400"
                        : "text-gray-700"
                    }
                  />
                  <p className="pl-1">{rating.label}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FilterRating;

