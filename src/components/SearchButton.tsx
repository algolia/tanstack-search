import { MdSearch } from "react-icons/md";
import { useSearchContext } from "../SearchContext";
import { BiCommand } from "react-icons/bi";

export function SearchButton() {
  const { openSearch } = useSearchContext();

  return (
    <button
      className="flex items-center justify-between p-2 text-left bg-gray-500/10 rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300 w-[250px]"
      onClick={openSearch}
    >
      <div className="flex items-center gap-2 text-sm">
        <MdSearch className="text-lg" /> Search...
      </div>
      <div className="flex items-center bg-gray-500/10 rounded-lg px-2 py-1 gap-1 font-bold text-xs">
        <BiCommand /> + K
      </div>
    </button>
  );
}
