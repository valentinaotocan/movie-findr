import { FaArrowRotateLeft } from "react-icons/fa6";

interface LabelResetProps {
  label: string;
  onReset: () => void;
};

function LabelReset({ label, onReset }: LabelResetProps) {
  return (
    <div className="flex justify-between pb-3">
      <p>{label}</p>
      <button onClick={onReset} className="flex items-center">
        <span className="pr-1 text-xs">
          <FaArrowRotateLeft />
        </span>
        Reset
      </button>
    </div>
  );
}
export default LabelReset;
