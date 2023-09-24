"use client";
import React from "react";
import { Blog } from "@/types/blog";
import Link from "next/link";
import axios from "axios";

type BlogProps = {
  blogs: Blog[];
};

const BlogTable = ({ blogs }: BlogProps) => {
  const handleDeleteClick = async (slug: string) => {
    console.log("delete blog !!");

    const res = await axios.delete(`/api/blog/${slug}`);
    if (res) {
      console.log(slug);
    }
  };
  // console.log(blogs);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="table table-lg w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="hover">
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Tags</th>
            <th scope="col">Author</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {blogs.map((blog) => (
          <tbody key={blog.id}>
            <tr className="text-gray-700 hover bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                scope="row"
                className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {blog.id}
              </th>
              <td>{blog.title}</td>
              <td>
                <div className="flex flex-row space-x-3 font-medium">
                  {blog.tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="badge badge-outline badge-md text-sm font-medium text-gray-900"
                    >
                      {tag.name.toLowerCase()}
                    </div>
                  ))}
                </div>
              </td>

              <td>{blog.author.name}</td>
              <td className="flex space-x-2">
                <Link
                  href={`/admin/blog/edit/${blog.slug}`}
                  className="btn btn-xs btn-outline btn-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteClick(blog.slug)}
                  className="btn btn-xs btn-outline btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default BlogTable;
