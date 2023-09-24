"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import dayjs from "dayjs";

type BlogProps = {
  blog: Blog;
  isLoading: boolean;
};

const BlogPage = ({ blog, isLoading }: BlogProps) => {
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  const publish = dayjs().format("LL");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center my-52 ">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-6 gap-4 pt-14 px-6">
      <div className="col-span-1">
        <Link href={"/blog"}>
          <button className="btn btn-sm btn-outline capitalize">
            🡐 All Posts
          </button>
        </Link>
      </div>
      <div className="col-span-4 pb-14">
        <p className="font-medium text-gray-600 pb-2 ">{`Published ${publish}`}</p>
        <p className="text-4xl font-semibold py-2 grid-flow-row-dense">
          {blog.title}
        </p>
        <div className="flex items-center space-x-1 px-2">
          <Image
            src={blog.author.image}
            width={25}
            height={25}
            alt="profileImage"
            className="rounded-full"
          />
          <p className="font-semibold text-gray-900 text-sm">
            {`By ${blog.author.name}`}
          </p>
        </div>
        <div className="flex justify-center py-14">
          <Image
            src={blog.coverImage}
            alt="coverImage"
            width={550}
            height={400}
          />
        </div>
        <article
          className="content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></article>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default BlogPage;
