import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { DropdownProps } from "../../types";

const DropdownButton = ({
  isOpen,
  label,
  toggle,
  className
}: DropdownProps) => (
  <button
    onClick={toggle}
    type="button"
    className={`inline-flex items-center ${className}`}
  >
    {label}
    {isOpen ? (
      <FaAngleUp className="ml-2" />
    ) : (
      <FaAngleDown className="ml-2" />
    )}
  </button>
);

export default DropdownButton;
