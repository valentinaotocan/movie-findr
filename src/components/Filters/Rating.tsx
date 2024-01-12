import { FilterProps } from "../../types";
import ReturnRatingRuntime from "./ReturnRuntimeRating";

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
    <ReturnRatingRuntime
      label="Rating"
      selectedValue={selectedValue}
      onChange={onChange}
      isOpen={isOpen}
      toggleDropdown={toggleDropdown}
      widthClass="w-[13.75rem]"
      options={ratingOptions}
      onReset={handleReset}
    />
  );
}

export default Rating;
