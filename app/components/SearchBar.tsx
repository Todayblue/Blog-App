import React, { ChangeEvent, useState, useEffect } from "react";
("use client");

import Card from "../components/Card";
import getBlogs from "../action/getBlogs";

import { Blog, Tag } from "@/types/model";

import getTags from "../action/getTags";
interface SearchBarProps {
  keyword: string;
  onChange: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ keyword, onChange }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredList, setFilteredList] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      const fetchedBlogs: Blog[] = await getBlogs();
      setBlogs(fetchedBlogs);
    }

    fetchBlogs();
  }, []);

  useEffect(() => {
    // Set the default value of filteredList when blogs state changes
    setFilteredList(blogs);
  }, [blogs]);

  const filterBySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();

    // Filter blogs based on the search query
    const updatedList = blogs.filter((blog) => {
      if (!query) {
        return true; // Include all blogs when query is empty
      }

      // Check if the blog title includes the query
      const titleMatch = blog.title.toLowerCase().includes(query);

      // Check if any tag names include the query
      const tagMatch = blog.tags.some((tag) =>
        tag.name.toLowerCase().includes(query)
      );

      // Include the blog in the filtered list if either the title or a tag matches
      return titleMatch || tagMatch;
    });

    setFilteredList(updatedList);
  };

  return (
    <div className="relative flex justify-end ">
      <input
        className="border-2 border-gray-300 bg-white h-10  pr-10 rounded-lg text-sm focus:outline-none"
        id="search-box"
        type="search"
        name="search"
        placeholder="Search Tags, Titles"
        onChange={filterBySearch}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
