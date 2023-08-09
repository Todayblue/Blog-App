"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Editor from "./editor/Editor";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
// style
import "react-quill/dist/quill.snow.css";
import { type } from "os";

type Category = {
  id: string;
  name: string;
};

type FormType = {
  title: string;
  content: string;
  published: boolean;
  coverImage: string;
  authorId: string;
  categoryId: "";
};

type CreateBlogProps = {
  categories: Category[];
};

const CreateBlog = ({ categories }: CreateBlogProps) => {
  const [formData, setFormData] = useState<Partial<FormType>>({
    title: "",
    coverImage: "",
    authorId: "",
    categoryId: "",
  });
  const [content, setContent] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;

    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submitPost = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/blog", {
        title: formData.title,
        content,
        published: true,
        coverImage:
          "https://images.unsplash.com/photo-1684852703493-bdae9ac4cc35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
        authorId: "64d12b35a2d4151b91b6d90b",
        categoryId: formData.categoryId,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(formData);

  return (
    <form className="flex justify-center items-center flex-col  w-full">
      <div className="mb-6">
        <div className="space-y-12 ">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div>
                  <input
                    value={formData.title}
                    onChange={handleInputChange}
                    name="title"
                    type="text"
                    placeholder="Type here"
                    className="mt-2 input input-bordered block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />{" "}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="caregory"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Caregory
                </label>
                <select
                  onChange={handleSelectChange}
                  name="categoryId"
                  id="categoryId"
                  className="mt-2 select select-bordered w-full "
                >
                  <option disabled selected>
                    Choose Category?
                  </option>
                  {categories.map((category) => {
                    return (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover Image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="coverImage"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="coverImage"
                          name="coverImage"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <div className="pl-1">or drag and drop</div>
                    </div>
                    <div className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Content
                </label>
                <div className="mt-2 ">
                  <Editor value={content} onChange={setContent} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-6 flex justify-end gap-x-6  ">
          <button type="button" className="btn btn-ghost">
            Cancel
          </button>
          <button
            onClick={submitPost}
            type="button"
            className="btn btn-outline"
          >
            Create Blog
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateBlog;
