"use client";

import { Dispatch, SetStateAction } from "react";

interface Props {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  isHandling?: boolean;
}

const Search = ({ inputValue, setInputValue, isHandling }: Props) => {
  return (
    <div className="relative mt-5">
      <label htmlFor="search-box" className="sr-only">
        Search
      </label>
      <input
        className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm pl-10 pr-3 focus:outline-none"
        placeholder="Search Tags, Titles"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <svg
        className="absolute left-3 top-3 w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
  );
};

export default Search;
