"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { Tag } from "@/types/blog";
import CreatableSelect from "react-select/creatable";
import Editor from "../editor/Editor";

type FormType = {
  title: string;
  content?: string;
  coverImage: string;
  authorId: string;
  tagName: string[];
};

type userProp = {
  userId: number;
};

type SelectType = {
  value: string;
  label: string;
  __isNew___?: boolean;
};

const BlogForm = () => {
  const userId = 1;
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [file, setFile] = useState<File | undefined>();
  const [selectedOption, setSelectedOption] = useState<SelectType[]>([]);
  const [fileURL, setFileURL] = useState<string | undefined>();

  const [formData, setFormData] = useState<FormType>({
    title: "",
    coverImage: "",
    authorId: "",
    tagName: [],
  });

  const getTags = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tag");
      const data = res.data;

      return data.tags;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      const fetchedTags = await getTags();
      setTags(fetchedTags);
    };

    fetchTags();
  }, []);

  const options = tags.map((tag) => ({
    value: tag.id.toString(),
    label: tag.name,
  }));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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

    const selectedTagฺName = selectedOptions.map((option: any) => option.label);

    setFormData({
      ...formData,
      tagName: selectedTagฺName,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const toastId = toast.loading("Creating blog post...");
    const newSelect: SelectType[] = selectedOption.filter(
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
      const coverImage = uploadData.data; // Get the uploaded image path or URL

      const response: FormType = await axios.post("/api/blog", {
        title: formData.title,
        content,
        coverImage,
        authorId: userId,
        tagName: formData.tagName,
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
      {/* <Toaster /> */}

      <div className="w-6/12 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-600 pb-4">
          Write Blog
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
            {/* Title */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-900">
                Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                type="text"
                placeholder="title.."
                className="input input-bordered w-full rounded-md mt-2 text-gray-900  ring-gray-300 placeholder:text-gray-400sm:text-sm sm:leading-6"
              />
            </div>

            {/* Tag */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-900">
                Tag
              </label>
              <CreatableSelect
                isMulti
                options={options}
                className="basic-multi-select mt-2"
                classNamePrefix="select"
                value={selectedOption}
                onChange={handleSelectChange}
              />
            </div>

            {/* Cover Image */}
            <div className="col-span-full">
              <label
                htmlFor="cover-image"
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
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Content
              </label>
              <Editor value={content} onChange={setContent} />
            </div>

            {/* Buttons */}
            <div className="col-span-full flex justify-end ">
              <button type="button" className="btn btn-ghost">
                Cancel
              </button>
              <button type="submit" className="btn btn-outline">
                Create Blog
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BlogForm;
