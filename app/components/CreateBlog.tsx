"use client";
import axios from "axios";
import React, { useState } from "react";
import Editor from "./editor/Editor";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

// style
import "react-quill/dist/quill.snow.css";
import { Category as Cate } from "@/types/blog";

interface Category extends Pick<Cate, "id" | "name"> {}

type FormType = {
  title: string;
  content?: string;
  published?: boolean;
  coverImage: string;
  authorId: string;
  categoryId: string;
};

type CreateBlogProps = {
  userId: string | undefined;
  categories: Category[];
};

const CreateBlog = ({ userId, categories }: CreateBlogProps) => {
  const [formData, setFormData] = useState<FormType>({
    title: "",
    coverImage: "",
    authorId: "",
    categoryId: "",
  });

  const router = useRouter();
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [fileURL, setFileURL] = useState<string | undefined>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;

    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];

    if (uploadedFile) {
      setFile(uploadedFile);
      setFileURL(URL.createObjectURL(uploadedFile));
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submitPost = async (event: React.FormEvent) => {
    event.preventDefault();
    const toastId = toast.loading("Creating blog post...");
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!uploadRes.ok) throw new Error(await uploadRes.text());

      const uploadData = await uploadRes.json();
      const coverImage = uploadData.data; // Get the uploaded image path or URL
      // console.log(formData.categoryId);

      const response = await axios.post("/api/blog", {
        title: formData.title,
        content,
        coverImage, // Use the uploaded image path or URL
        authorId: userId,
        categoryId: formData.categoryId,
      });

      if (response) {
        const duration = 1000;
        toast.dismiss(toastId);
        toast.success("Create Blog Successfully!", {
          duration,
        });

        window.location.href = "/blog";
      }
    } catch (error) {
      console.error(error);
      toast.dismiss(toastId);
      toast.error("An error occurred while creating the blog");
    }
  };

  return (
    <>
      <Toaster />
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
                    <option>Choose Category?</option>
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
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="coverImage"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          {fileURL ? (
                            <div>
                              <img
                                src={fileURL}
                                alt="Preview"
                                style={{ maxWidth: "100%", maxHeight: "300px" }}
                              />
                            </div>
                          ) : (
                            <PhotoIcon
                              className="mx-auto h-12 w-12 text-gray-300"
                              aria-hidden="true"
                            />
                          )}
                          <input
                            id="coverImage"
                            name="coverImage"
                            type="file"
                            className="sr-only"
                            onChange={onImageUpload}
                          />
                          <span>Upload a file</span>
                        </label>
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
    </>
  );
};

export default CreateBlog;
