"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import getBlogs from "../action/getBlogs";
import Link from "next/link";
import { Blog, Tag } from "@/types/model";

import getTags from "../action/getTags";

const Page = () => {
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
        return true; // Include all blogs when the query is empty
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
    <main>
      {/* Search */}
      <div className="relative flex justify-between">
        <h1 className="ml-8 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          <Link href={"/blog"}>Blog</Link>
        </h1>

        <div className="relative mt-5">
          <label htmlFor="search-box" className="sr-only">
            Search
          </label>
          <input
            className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm pl-10 pr-3 focus:outline-none"
            id="search-box"
            type="search"
            name="search"
            placeholder="Search Tags, Titles"
            onChange={filterBySearch}
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
      </div>
      <div className="divider divide-gray-200 dark:divide-gray-600 py-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-6 gap-10">
        {filteredList.map((blog) => (
          <Card
            key={blog.id}
            id={blog.id}
            title={blog.title}
            content={blog.content}
            coverImage={blog.coverImage}
            tags={blog.tags.map((tag) => tag)}
          />
        ))}
      </div>
    </main>
  );
};

export default Page;
