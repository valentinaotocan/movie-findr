import { useState, useEffect } from "react";
import DropdownButton from "../common/DropdownButton";
import { FilterProps } from "../../types";
import LabelReset from "./LabelReset";
import TriangleSharp from "./TriangleSharp";

function Year({
  selectedValue,
  onChange,
  isOpen,
  toggleDropdown,
}: FilterProps<number | null>) {
  const currentYear = new Date().getFullYear();
  const [tooltip, setTooltip] = useState<number>(selectedValue || 0);

 useEffect(() => {
   setTooltip(selectedValue === null ? 0 : selectedValue);
 }, [selectedValue]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setTooltip(newYear);
  };

  const handleSliderChangeComplete = () => {
    onChange(tooltip);
  };

  const handleReset = () => {
    setTooltip(0);
    onChange(null);
  };

  const isYearSelected = selectedValue === tooltip && selectedValue !== null;

  const label = "Year";

  return (
    <>
      <DropdownButton isOpen={isOpen} label={label} toggle={toggleDropdown} />
      {isOpen && (
        <>
          <TriangleSharp />
          <div className="absolute z-10 p-3.5 rounded text-gray-300 bg-gray-600 mt-1 top-9 w-[15.625rem] md:bg-opacity-90">
            <LabelReset label={label} onReset={handleReset} />
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
