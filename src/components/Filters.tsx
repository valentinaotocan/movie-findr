import { FaFilter } from "react-icons/fa";
import { useState } from "react";
function Filters() {

  const [selectedYear, setSelectedYear] = useState(1920);

  return (
    <div className="flex pt-6 gap-3.5">
      <FaFilter />
      <h2>Filters</h2>
      <p>Year</p>

      <div className="relative mb-6">
        <label htmlFor="labels-range-input" className="sr-only">
          Labels range
        </label>
        <input
          id="labels-range-input"
          type="range"
          min="1900"
          max={new Date().getFullYear()}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          value={selectedYear}
          // onChange={({ target: { value: radius } }) => {
          //   setSelectedYear(radius);
          // }}
        />
        <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
          1990
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
          {new Date().getFullYear()}
        </span>
        <span>{selectedYear}</span>
      </div>

      <p>Genres</p>
      <p>Country</p>
      <p>Rating</p>
      <p>Runtime</p>
    </div>
  );
}
export default Filters;
