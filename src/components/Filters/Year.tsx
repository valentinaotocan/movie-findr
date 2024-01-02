import { useState } from "react";
import { IoTriangleSharp } from "react-icons/io5";
import DropdownButton from "../common/DropdownButton";
import { FilterProps } from "../../types";

function Year({
  selectedValue,
  onChange,
  isOpen,
  toggleDropdown,
}: FilterProps<number | null>) {
  const currentYear = new Date().getFullYear();
  const [tooltip, setTooltip] = useState<number>(selectedValue || 0);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setTooltip(newYear);
  };

  const handleSliderChangeComplete = () => {
    onChange(tooltip);
  };

  const handleReset = () => {
    setTooltip(1900);
    onChange(null);
  };

  const isYearSelected = selectedValue === tooltip && selectedValue !== null;

  return (
    <>
      <DropdownButton
        isOpen={isOpen}
        label="Year"
        toggle={toggleDropdown}
      />
      {isOpen && (
        <>
          <IoTriangleSharp className="absolute z-10 text-gray-600 top-[1.625rem] -mb-[0.188rem] ml-[50%] md:text-opacity-90" />
          <div className="absolute z-10 p-3.5 rounded text-gray-300 bg-gray-600 mt-1 top-9 w-[15.625rem] md:bg-opacity-90">
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

export default Year;
