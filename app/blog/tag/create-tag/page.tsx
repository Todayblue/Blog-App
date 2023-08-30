import getTags from "@/app/action/getTags";
import CreateTag from "@/app/components/CreateTag";
import { Tag } from "@/types/model";

import React from "react";

const page = async () => {
  const tags: Tag[] = await getTags();
  // return <CreateTag tags={tags} />;
  return (
    <>
      <CreateTag />
      {/* ///Todo Table */}
      <div className="flex justify-center py-10">
        <div className="w-full max-w-xl">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Tags
              </caption>

              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NAME
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag) => (
                  <>
                    <tr
                      key={tag.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{tag.id}</td>
                      <td className="px-6 py-4">{tag.name}</td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href={`http://localhost:3000/blog/tag/edit/${tag.id}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
