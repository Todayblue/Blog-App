"use client";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Tag } from "@/types/model";

const CreateTag = () => {
  const [tag, setTag] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const addTag = await axios.post("/api/tag", {
        name: tag,
      });

      if (addTag) {
        console.log("addTag", addTag);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <div className="border-b border-gray-900/10 pb-5  w-96">
          <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">
            Create Tag
          </h2>
          <div className="mt-10 ">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Add Tag
            </label>
            <div className="mt-2">
              <input
                value={tag}
                onChange={handleChange}
                name="title"
                type="text"
                placeholder="Type here"
                className="mt-2 input input-bordered block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="flex justify-end py-3">
            <button type="submit" className="btn btn-outline btn-sm ">
              Create tag
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateTag;
