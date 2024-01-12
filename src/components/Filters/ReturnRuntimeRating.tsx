import { GiCheckMark } from "react-icons/gi";
import DropdownButton from "../common/DropdownButton";
import LabelReset from "./LabelReset";
import TriangleSharp from "./TriangleSharp";
import { ReturnRuntimeRatingProps } from "../../types";

function ReturnRuntimeRating({
  selectedValue,
  onChange,
  isOpen,
  toggleDropdown,
  label,
  options,
  widthClass,
  onReset,
}: ReturnRuntimeRatingProps) {
  const handleReset = () => {
    onChange(null);
  };

  return (
    <>
      <DropdownButton isOpen={isOpen} label={label} toggle={toggleDropdown} />
      {isOpen && (
        <>
          <TriangleSharp />
          <div
            className={`absolute z-10 p-3.5 text-gray-300 rounded bg-gray-600 top-[2.25rem] mt-1 w-[12.5rem] ${widthClass} md:bg-opacity-90 `}
          >
            <LabelReset label={label} onReset={handleReset} />
            <div className="flex flex-col gap-3">
              {options.map((option) => (
                <div
                  key={option.id}
                  className={`cursor-pointer w-full text-left flex items-center ${
                    selectedValue === option.value
                      ? "text-yellow-400 font-semibold"
                      : ""
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    if (option.value === null && onReset) {
                      onReset();
                    }
                  }}
                >
                  <GiCheckMark
                    className={
                      selectedValue === option.value
                        ? "text-yellow-400"
                        : "text-gray-700"
                    }
                  />
                  <p className="pl-1">{option.label}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default ReturnRuntimeRating;
