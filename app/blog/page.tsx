"use client";
import React, { useState } from "react";
import BlogList from "@/components/Blog/BlogList";
import { getBlogs } from "@/lib/getBlogs";
import { useQuery } from "@tanstack/react-query";
import { Blog, Tag } from "../../types/blog";
import Link from "next/link";
import getTags from "@/lib/getTags";
import Pagination from "@/components/Pagination";
import { ITEM_PER_PAGE } from "@/lib/constants";

const Page = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isPreviousData, isLoading } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => getBlogs(page, ITEM_PER_PAGE),
    keepPreviousData: true,
  });
  const tagsQuery = useQuery({ queryKey: ["tags"], queryFn: getTags });

  if (!data) {
    return null;
  }

  return (
    <main>
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-5xl md:leading-14">
          All Posts
        </h1>
        <div className="divider my-2"></div>
        <ul className="flex flex-wrap">
          {tagsQuery.isLoading ? (
            <div className="flex items-center mx-16 justify-center">
              <span className="loading loading-spinner loading-sm"></span>
            </div>
          ) : (
            <div className="flex flex-row flex-wrap">
              <div className="mr-4 text-gray-900">Tags</div>
              {tagsQuery.data.map((tag: Tag) => (
                <li key={tag.id}>
                  <Link
                    href={`/blog/tag/${tag.slug}`}
                    className=" hover:text-sky-500 capitalize text-gray-500 text-sm font-medium mr-4 "
                  >
                    {tag.name.toLowerCase()}
                  </Link>
                </li>
              ))}
            </div>
          )}
        </ul>
      </div>

      <div className="pt-6">
        <BlogList blogs={data.blogs} isLoading={isLoading} />
      </div>

      <div className="flex justify-end pt-3 pb-6">
        <Pagination
          currentPage={page}
          isPreviousData={isPreviousData}
          url={`/blog/?page=`}
          totalItems={data.blogCount}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </main>
  );
};

export default Page;
