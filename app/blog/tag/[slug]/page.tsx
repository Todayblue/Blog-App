"use client";
import BlogList from "@/components/Blog/BlogList";
import BlogPage from "@/components/Blog/BlogPage";
import { getTagBySlug } from "@/lib/getTagBySlug";
import getTags from "@/lib/getTags";
import { Tag } from "@/types/blog";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import Link from "next/link";

const Page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { data: tag, isLoading }: UseQueryResult<Tag> = useQuery({
    queryKey: ["tag", slug],
    queryFn: () => getTagBySlug(slug),
  });
  const tagsQuery = useQuery({ queryKey: ["tags"], queryFn: getTags });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center my-52 ">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!tag) {
    return <p>Tag not found</p>;
  }

  console.log(tag.blogs);

  return (
    <>
      <div className="flex flex-col">
        <h1 className="capitalize text-2xl font-semibold text-gray-800 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-5xl md:leading-14">
          {tag.name}
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

      {isLoading ? (
        <div className="flex items-center justify-center my-56">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      ) : (
        <div className="my-6">
          <BlogList blogs={tag.blogs} />
        </div>
      )}
    </>
  );
};

export default Page;
