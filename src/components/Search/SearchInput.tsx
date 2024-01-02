import { SearchInputProps } from "../../types";
import { ImSearch } from "react-icons/im";
import { BsXCircleFill } from "react-icons/bs";

function SearchInput({ searchTerm, onChange, onClear }: SearchInputProps) {
  return (
    <>
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <ImSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-2 ps-10 rounded border border-gray-900 bg-gray-900 focus:border-yellow-400 focus:outline-none"
        placeholder="Type here to search for movies"
        value={searchTerm}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={onClear}
        className="absolute end-1 bottom-[0.55rem] px-1.5 bottom-0"
      >
        <BsXCircleFill className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-yellow-400" />
      </button>
    </>
  );
}

export default SearchInput;
