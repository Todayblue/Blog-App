"use client";
import React from "react";
import BlogList from "@/components/Blog/BlogList";
import { getBlogs } from "@/lib/getBlogs";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Blog, Tag } from "../../types/blog";
import Link from "next/link";
import getTags from "@/lib/getTags";
import PaginationControls from "@/components/PaginationControls";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const blogsQuery: UseQueryResult<Blog[]> = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });
  const tagsQuery = useQuery({ queryKey: ["tags"], queryFn: getTags });

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "2";

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const blogs = blogsQuery.data?.slice(start, end);

  if (!blogsQuery.data) {
    return <div></div>;
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

      {blogsQuery.isLoading ? (
        <div className="flex items-center justify-center my-56">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      ) : (
        <div className="my-6">
          <BlogList blogs={blogs} />
        </div>
      )}
      <PaginationControls
        hasNextPage={end < blogsQuery.data.length}
        hasPrevPage={start > 0}
        urlPath={"blog"}
      />
    </main>
  );
};

export default Page;
