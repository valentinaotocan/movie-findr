import { IoTriangleSharp } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import DropdownButton from "../common/DropdownButton";
import { FilterProps } from "../../types";

function Runtime({
  selectedValue,
  onChange,
  isOpen,
  toggleDropdown,
}: FilterProps<number | null>) {

  const runtimeOptions = [
    { id: 1, label: "Less than 60 mins", value: 60 },
    { id: 2, label: "Less than 120 mins", value: 120 },
    { id: 3, label: "More than 120 mins", value: 121 },
  ];

  const handleReset = () => {
    onChange(null);
  };

  return (
    <div>
      <DropdownButton
        isOpen={isOpen}
        label="Runtime"
        toggle={toggleDropdown}
      />
      {isOpen && (
        <>
          <IoTriangleSharp className="absolute z-10 text-gray-600 top-[1.625rem] ml-[50%] md:text-opacity-90" />
          <div className="absolute z-10 p-3.5 text-gray-300 rounded bg-gray-600 mt-1 w-[12.5rem] top-9 md:bg-opacity-90">
            <div className="flex justify-between pb-3">
              <p>Runtime</p>
              <button onClick={handleReset}>Reset</button>
            </div>
            <div className="flex flex-col gap-3">
              {runtimeOptions.map((runtime) => (
                <div
                  key={runtime.id}
                  className={`cursor-pointer w-full text-left flex items-center ${
                    selectedValue === runtime.value
                      ? "text-yellow-400 font-semibold"
                      : ""
                  }`}
                  onClick={() => onChange(runtime.value)}
                >
                  <GiCheckMark
                    className={
                      selectedValue === runtime.value
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

export default Runtime;
