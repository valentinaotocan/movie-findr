import { FilterProps } from "../../types";
import ReturnRuntimeRating from "./ReturnRuntimeRating";

function Runtime({
  selectedValue,
  onChange,
  isOpen,
  toggleDropdown,
}: FilterProps<number | null>) {
  const runtimeOptions = [
    { id: 1, label: "Less or equal to 60 mins", value: 60 },
    { id: 2, label: "Less or equal to 120 mins", value: 120 },
    { id: 3, label: "More or equal to 121 mins", value: 121 },
  ];

  const handleReset = () => {
    onChange(null);
  };

  return (
    <ReturnRuntimeRating
      label="Runtime"
      selectedValue={selectedValue}
      onChange={onChange}
      isOpen={isOpen}
      toggleDropdown={toggleDropdown}
      widthClass="w-[14.55rem]"
      options={runtimeOptions}
      onReset={handleReset}
    />
  );
}

export default Runtime;
