import { IoTriangleSharp } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import DropdownButton from "../common/DropdownButton";
import { FilterProps } from "../../types";

function Rating({
  selectedValue,
  onChange,
  isOpen,
  toggleDropdown,
}: FilterProps<number | null>) {
  const ratingOptions = [
    { id: 1, label: "No rating", value: 0 },
    { id: 2, label: "Less or equal to 5", value: 5 },
    { id: 3, label: "Greater or equal to 5.1", value: 5.1 },
    { id: 4, label: "Greater or equal to 9", value: 9 },
  ];

  const handleReset = () => {
    onChange(null);
  };

  return (
    <>
      <DropdownButton
        isOpen={isOpen}
        label="Rating"
        toggle={toggleDropdown}
      />
      {isOpen && (
        <>
          <IoTriangleSharp className="absolute z-10 text-gray-600 top-[1.625rem] -mb-[0.188rem] ml-[50%] md:text-opacity-90" />
          <div className="absolute z-10 p-3.5 rounded text-gray-300 bg-gray-600 mt-1 top-9 w-[13.75rem] md:bg-opacity-90">
            <div className="flex justify-between pb-3">
              <p>Rating</p>
              <button onClick={handleReset}>Reset</button>
            </div>
            <div className="flex flex-col gap-3">
              {ratingOptions.map((rating) => (
                <div
                  key={rating.id}
                  className={`cursor-pointer w-full text-left flex items-center ${
                    selectedValue === rating.value
                      ? "text-yellow-400 font-semibold"
                      : ""
                  }`}
                  onClick={() => onChange(rating.value)}
                >
                  <GiCheckMark
                    className={
                      selectedValue === rating.value
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

export default Rating;
