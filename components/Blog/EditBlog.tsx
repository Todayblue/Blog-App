"use client";
import React, { useEffect } from "react";

import "react-quill/dist/quill.snow.css";
import { FormEventHandler, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import CreatableSelect from "react-select/creatable";
import Image from "next/image";
import Editor from "../editor/Editor";
import { Blog, Tag } from "@/types/blog";
import axios from "axios";

type Props = {
  blog: Blog;
  tags: Tag[];
};

type tag = Omit<Tag, "slug" | "blogs">;

type FormType = {
  title: string;
  content: string;
  coverImage: string;
  authorId: number;
  tagSelected: SelectType[];
};

type SelectType = {
  value?: string;
  label?: string;
  __isNew___?: boolean;
};

const setSelectDefault: any = (blog: Blog) => {
  return blog.tags.map((tag) => ({
    value: tag.id.toString,
    label: tag.name,
  }));
};

const EditBlog = ({ blog, tags }: Props) => {
  const [fileURL, setFileURL] = useState<string>(blog.coverImage);
  const [file, setFile] = useState<File>();
  const [formData, setFormData] = useState<FormType>({
    title: blog.title,
    coverImage: blog.coverImage,
    content: blog.content,
    authorId: 1,
    tagSelected: setSelectDefault(blog),
  });

  const selected: any = formData.tagSelected.map((tag) => ({
    id: tag.value,
  }));

  const tagSelected = [
    {
      id: 9,
    },
    {
      id: 18,
    },
  ];

  const options = tags.map((tag) => ({
    value: tag.id.toString(),
    label: tag.name,
  }));

  const handleSelectChange = (selectedOptions: any) => {
    const selectedTag = selectedOptions.map((option: any) => option);

    setFormData({
      ...formData,
      tagSelected: selectedTag,
    });
  };

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];

    if (uploadedFile) {
      setFile(uploadedFile);
      setFileURL(URL.createObjectURL(uploadedFile));
      setFormData({ ...formData, coverImage: fileURL });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (value: string) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newSelect: SelectType[] = formData.tagSelected.filter(
      (option: any) => option.__isNew__ === true
    );

    if (newSelect.length !== 0) {
      newSelect.map((select) =>
        axios.post("/api/blog/tag", {
          name: select.label,
        })
      );
    }

    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const uploadRes = await fetch("/api/image-upload", {
        method: "POST",
        body: data,
      });

      if (!uploadRes.ok) throw new Error(await uploadRes.text());

      const uploadData = await uploadRes.json();
      const coverImage: string = uploadData.data;

      const response: FormType = await axios.put(`/api/blog/${blog.slug}`, {
        title: formData.title,
        content: formData.content,
        coverImage: coverImage,
        authorId: formData.authorId,
        tags: tagSelected,
      });

      if (response) {
        const duration = 1000;
        console.log("response", response);
        window.location.href = "/blog";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="w-full p-6 m-auto lg:max-w-xl">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
            {/* Title */}
            <div className="col-span-full">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-900"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                type="text"
                placeholder="title.."
                className="input input-bordered w-full rounded-md mt-2 text-gray-900  ring-gray-300 placeholder:text-gray-400sm:text-sm sm:leading-6"
              />
            </div>

            {/* Tag */}
            <div className="col-span-full " key={blog.id}>
              <label
                htmlFor="tag"
                className="block text-sm font-medium text-gray-900"
              >
                Tag
              </label>
              <CreatableSelect
                id="tag"
                isMulti
                options={options}
                className="basic-multi-select mt-2"
                classNamePrefix="select"
                onChange={handleSelectChange}
                value={formData.tagSelected}
              />
            </div>

            {/* Cover Image */}
            <div className="col-span-full">
              <label
                htmlFor="coverImage"
                className="block text-sm font-medium text-gray-900"
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
                          <Image
                            src={fileURL}
                            alt="Preview"
                            width={544}
                            height={306}
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

            {/* Content */}
            <div className="col-span-full">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-900"
              >
                Content
              </label>
              <div className="mt-2">
                <Editor
                  value={formData.content}
                  onChange={handleContentChange}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-6">
            <button type="button" className="btn btn-ghost btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-outline btn-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
