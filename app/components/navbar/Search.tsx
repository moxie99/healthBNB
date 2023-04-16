"use client";
import useSearchModal from "@/app/hooks/useSearchModal";
import { BiSearch } from "react-icons/bi";
const Search = () => {
  const searchModal = useSearchModal();
  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          Any time
        </div>
        <div className="text-sm pl-5 pr-3 text-gray-500 flex flex-row items-center gap-3">
          <div className="hidden sm:block">Add Patients</div>
          <div className="p-2 rounded-full text-white bg-green-500">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
