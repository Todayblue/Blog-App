import getTags from "@/app/action/getTags";

import { Tag } from "@/types/model";
import Link from "next/link";

import React from "react";

const page = async () => {
  const tags: Tag[] = await getTags();
  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0 md:my-48">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {/* {tagKeys.length === 0 && "No tags found."} */}
          {tags.map((tag) => {
            return (
              <div key={tag.id} className="mb-2 mr-5 mt-2">
                {/* <Tags text={tag.name} /> */}
                <Link
                  href={`/blog/tag/${tag.id}`}
                  className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label={`View posts tagged ${tag.name}`}
                >
                  {tag.name.split(" ").join("-")}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default page;
