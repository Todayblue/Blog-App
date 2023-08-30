"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Editor from "./editor/Editor";
import { PhotoIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import { Tag } from "@/types/model";

import "react-quill/dist/quill.snow.css";
import getTags from "../action/getTags";
import Link from "next/link";

type FormType = {
  title: string;
  content?: string;
  coverImage: string;
  authorId: string;
  tags: number[];
};

type userProp = {
  userId: number;
};

const CreateBlog = ({ userId }: userProp) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [tags, setTags] = useState<Tag[]>([]);

  console.log("userId", userId);

  const tagOptions = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const [formData, setFormData] = useState<FormType>({
    title: "",
    coverImage: "",
    authorId: "",
    tags: [],
  });

  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [fileURL, setFileURL] = useState<string | undefined>();

  useEffect(() => {
    async function fetchTags() {
      const fetchedTags = await getTags();
      setTags(fetchedTags);
    }

    fetchTags();
  }, []);

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

  const handleSelectChange = (selectedOptions: any) => {
    setSelectedOption(selectedOptions);

    // Extract the selected category IDs from the selectedOptions
    const selectedTagIDs = selectedOptions.map((option: any) => option.value);

    // Update the formData with the selected category IDs
    setFormData({
      ...formData,
      tags: selectedTagIDs,
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

      const response: FormType = await axios.post("/api/blog", {
        title: formData.title,
        content,
        coverImage,
        authorId: userId,
        tags: formData.tags,
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
              <div className=" mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <div className="text-2xl font-bold ">Create Blog</div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="titlee"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>

                  <input
                    value={formData.title}
                    onChange={handleInputChange}
                    name="title"
                    type="text"
                    placeholder="Type here"
                    className="mt-2 input input-bordered block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="tag"
                    className="block text-sm font-medium mb-2 leading-6 text-gray-900"
                  >
                    Tag
                  </label>
                  <Select
                    isMulti
                    name="categories"
                    options={tagOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={selectedOption}
                    onChange={handleSelectChange}
                  />
                  <Link href={"/blog/tag"} className="  flex justify-end">
                    <button className="btn btn-xs btn-outline mt-3">
                      Add Tag
                    </button>
                  </Link>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="cover-image"
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
