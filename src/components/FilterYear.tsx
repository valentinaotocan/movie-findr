import { useState, useEffect } from "react";
import { IoTriangleSharp } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

interface ReleaseYearDropdownProps {
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  isOpen: boolean;
  toggleDropdown: () => void;
}

function FilterYear({
  selectedYear,
  onYearChange,
  isOpen,
  toggleDropdown,
}: ReleaseYearDropdownProps) {
  const currentYear = new Date().getFullYear();
  const [tooltip, setTooltip] = useState<number>(selectedYear || 0);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setTooltip(newYear);
  };

  const handleSliderChangeComplete = () => {
    onYearChange(tooltip);
  };

  const handleReset = () => {
    setTooltip(1900);
    onYearChange(null);
  };

  const isYearSelected = selectedYear === tooltip && selectedYear !== null;

  return (
    <>
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex items-center"
      >
        Year{" "}
        {isOpen ? (
          <FaAngleUp className="ml-2" />
        ) : (
          <FaAngleDown className="ml-2" />
        )}
      </button>
      {isOpen && (
        <>
          <IoTriangleSharp className="absolute z-10 text-gray-600 top-[26px] -mb-[3px] ml-[50%] md:text-opacity-90" />
          <div className="absolute z-10 p-3.5 rounded text-gray-300 bg-gray-600 mt-1 top-[36px] w-[250px] md:bg-opacity-90">
            <div className="flex justify-between">
              <p>Year</p>
              <button onClick={handleReset}>Reset</button>
            </div>

            <div
              className={`flex justify-center pb-1 text-${
                isYearSelected ? "yellow-400" : "gray-300"
              } font-semibold`}
            >
              {tooltip}
            </div>
            <div className="flex items-center">
              <span>1900</span>
              <input
                type="range"
                min="1900"
                max={currentYear}
                value={tooltip}
                onChange={handleSliderChange}
                onMouseUp={handleSliderChangeComplete}
                onTouchEnd={handleSliderChangeComplete}
                className="mx-2 hover:cursor-grab active:cursor-grabbing"
              />
              <span>{currentYear}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FilterYear;
