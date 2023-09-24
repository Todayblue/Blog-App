"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import BlogList from "@/components/Blog/BlogList";
import { Tag, Blog } from "@/types/blog";
import Link from "next/link";
import Search from "@/components/Search";

const Page = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredList, setFilteredList] = useState<Blog[]>([]);

  const getBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/blog");
      const data = res.data;

      return data.blogs;
    } catch (error) {
      console.log(error);
    }
  };

  const getTags = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/blog/tag");
      const data = res.data;

      return data.tag;
    } catch (error) {
      console.log(error);
    }
  };

  const handleTagClick = useCallback(
    (slug: string) => {
      const query = slug.toLowerCase();

      const filteredData = blogs.filter((blog) => {
        const tagSlugMatch = blog.tags.some((tag) => tag.slug.includes(query));

        return tagSlugMatch;
      });

      setFilteredList(filteredData);
    },
    [blogs]
  );

  // Search Handler
  const searchHandler = useCallback(() => {
    const query = inputValue.toLowerCase();

    const filteredData = blogs.filter((blog) => {
      // Check if the blog title includes the query
      const titleMatch = blog.title.toLowerCase().includes(query);

      // Check if any tag names include the query
      const tagMatch = blog.tags.some((tag) =>
        tag.name.toLowerCase().includes(query)
      );

      // Include the blog in the filtered list if either the title or a tag matches
      return titleMatch || tagMatch;
    });

    setFilteredList(filteredData);
  }, [blogs, inputValue]);

  // EFFECT: Search Handler
  useEffect(() => {
    // const fetchBlogs = async () => {
    //   const fetchedBlogs: Blog[] = await getBlogs();
    //   setBlogs(fetchedBlogs);
    // };
    // fetchBlogs();
    // Debounce search handler
    const timer = setTimeout(() => {
      searchHandler();
    }, 500);

    // Cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [searchHandler]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs: Blog[] = await getBlogs();
      setBlogs(fetchedBlogs);
    };

    const fetchedTags = async () => {
      const fetchedTags: Tag[] = await getTags();
      setTags(fetchedTags);
    };

    fetchBlogs();
    fetchedTags();
  }, []);

  return (
    <main>
      {/* Search */}
      <Search inputValue={inputValue} setInputValue={setInputValue} />
      <Link href={"/blog/tag"} className="text-2xl font-light py-6">
        All Tag
      </Link>
      <div className="flex flex-row">
        {tags.map((tag) => (
          <div key={tag.id}>
            <span
              onClick={() => handleTagClick(tag.slug)}
              className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 text-sm font-medium mr-3 px-3 py-1.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300"
            >
              {/* <Link href={`/blog/tag/${tag.slug}`}>
              </Link> */}
              {tag.name.toLowerCase()}
            </span>
          </div>
        ))}
      </div>

      {/* <Search inputValue={inputValue} setInputValue={setInputValue} /> */}
      <div className="divider divide-gray-200 dark:divide-gray-600 py-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-6 gap-10">
        <BlogList blogs={filteredList} />
      </div>
    </main>
  );
};

export default Page;
