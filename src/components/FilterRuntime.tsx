import { IoTriangleSharp } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FilterRuntimeProps } from "../types";
import { GiCheckMark } from "react-icons/gi";

function FilterRuntime({
  selectedRuntime,
  onRuntimeChange,
  isOpen,
  toggleDropdown,
}: FilterRuntimeProps) {

 const runtimeOptions = [
   {id: 1, label: "Less than 60 mins", value: 60 },
   {id: 2, label: "Less than 120 mins", value: 120 },
   {id: 3, label: "More than 120 mins", value: 121 },
 ];

   const handleReset = () => {
     onRuntimeChange(null);
   };

  return (
    <div>
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex items-center"
      >
        Runtime
        {isOpen ? (
          <FaAngleUp className="ml-2" />
        ) : (
          <FaAngleDown className="ml-2" />
        )}
      </button>
      {isOpen && (
        <>
          <IoTriangleSharp className="absolute z-10 text-gray-600 top-[26px] ml-[50%] md:text-opacity-90"/>
          <div className="absolute z-10 p-3.5 text-gray-300 rounded bg-gray-600 mt-1 w-[200px] top-[36px] md:bg-opacity-90">
            <div className="flex justify-between pb-3">
              <p>Runtime</p>
              <button onClick={handleReset}>Reset</button>
            </div>
            <div className="flex flex-col gap-3">
              {runtimeOptions.map((runtime) => (
                <div
                  key={runtime.id}
                  className={`cursor-pointer w-full text-left flex items-center ${
                    selectedRuntime === runtime.value
                      ? "text-yellow-400 font-semibold"
                      : ""
                  }`}
                  onClick={() => onRuntimeChange(runtime.value)}
                >
                  <GiCheckMark
                    className={
                      selectedRuntime === runtime.value
                        ? "text-yellow-400"
                        : "text-gray-700"
                    }
                  />
                  <p className="pl-1">{runtime.label}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FilterRuntime;
