'use client'
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md hove:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6 text-center">
          Anywhere
        </div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          Any week
        </div>
        <div className="hidden sm:block text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          Add guests
        </div>
        <div className="bg-purple-500 font-semibold p-2 text-white rounded-full mr-2">
          <BiSearch size={14} />
        </div>
      </div>
    </div>
  );
};

export default Search;