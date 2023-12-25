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
  const [tooltip, setTooltip] = useState<number>(selectedYear || 1900);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setTooltip(newYear);
  };

  const handleSliderChangeComplete = () => {
    onYearChange(tooltip); // Fetch data when user finishes dragging
  };

  const handleReset = () => {
    setTooltip(1900);
    onYearChange(null);
  };

  return (
    <>
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex items-center"
      >
        Year <FaAngleDown className="ml-2" />
      </button>
      {isOpen && (
        <>
          <IoTriangleSharp className="absolute z-10 text-gray-900 -mb-[3px] ml-[50%]" />
          <div className="absolute z-10 p-3.5 rounded bg-gray-900 mt-1 -bottom-[118px] w-[250px]">
            <div className="flex justify-between">
              <p>Year</p>
              <button onClick={handleReset}>Reset</button>
            </div>

            <div className="flex justify-center pb-1">{tooltip}</div>
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
              <span className="rounded w-5">{currentYear}</span>{" "}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FilterYear;
