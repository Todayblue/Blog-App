"use client";
import Link from "next/link";
import Image from "next/image";
import { Blog, Tag } from "@/types/blog";

type BlogProps = {
  blogs: Blog[];
  isLoading: boolean;
};

const BlogList = ({ blogs, isLoading }: BlogProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center my-56">
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-y-5  place-items-center ">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="border max-w-md rounded-lg shadow dark:bg-gray-800  mb-4 duration-300 hover:scale-105 "
        >
          <Link href={`/blog/${blog.slug}`}>
            <Image
              alt="coverImage"
              src={blog.coverImage}
              width={385}
              height={145}
              className="max-w-md aspect-video w-full object-cover rounded-t-lg"
            />
          </Link>
          <div className="px-4">
            <Link href={`/blog/${blog.slug}`}>
              <div className="mb-1 mt-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {blog.title}
              </div>
            </Link>
            <p
              dangerouslySetInnerHTML={{ __html: blog.content.toLowerCase() }}
              className="line-clamp-3 font-normal text-sm"
            ></p>
          </div>
          <div className="flex justify-between px-4 py-3">
            <div className="flex items-center space-x-1">
              <Image
                src={blog.author.image}
                width={30}
                height={30}
                alt="profileImage"
                className="rounded-full"
              />
              <p className="font-bold text-gray-700 text-sm">
                {`By ${blog.author.name}`}
              </p>
            </div>
            <div className="pt-2 flex flex-row items-center space-x-1 font-medium">
              {blog.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog/tag/${tag.slug}`}
                  className="badge badge-outline text-black text-sm font-medium hover:text-sky-500 "
                >
                  {tag.name.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
