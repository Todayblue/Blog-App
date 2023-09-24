"use client";
import { Tag } from "@/types/blog";
import axios from "axios";
import Link from "next/link";
import React from "react";

type tagProps = {
  tags: Tag[];
};

const TagTable = ({ tags }: tagProps) => {
  const handleDeleteClick = async (slug: string) => {
    console.log("delete tag !!");

    const res = await axios.delete(`/api/tag/${slug}`);
    if (res) {
      console.log(slug);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="table table-lg w-3/4 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="hover">
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {tags.map((tag) => (
          <tbody key={tag.id}>
            <tr className="text-gray-700 hover bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                scope="row"
                className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {tag.id}
              </th>
              <td>{tag.name}</td>
              <td className="flex space-x-2">
                <Link
                  href={`/admin/tag/edit/${tag.slug}`}
                  className="btn btn-xs btn-outline btn-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteClick(tag.slug)}
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
export default TagTable;
