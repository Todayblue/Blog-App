import { Tag } from "@/types/blog";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

type Props = {
  tags: Tag[];
};

const SideBar = ({ tags }: Props) => {
  return (
    <div className="flex flex-col">
      <h1 className="ml-8 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        <button>Tags</button>
      </h1>
      <ul className="flex flex-col space-x-2 capitalize text-gray-500 ">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link href={`/blog/tag/${tag.slug}`}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
