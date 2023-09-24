import BlogList from "@/components/Blog/BlogList";
import BlogTable from "@/components/Blog/BlogTable";
import EditBlog from "@/components/Blog/EditBlog";
import TagTable from "@/components/TagTable";
import { Blog, Tag } from "@/types/blog";
import axios from "axios";
import React, { useEffect, useState } from "react";

const getBlogs = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/blog");
    const data = res.data;

    return data.blogs;
  } catch (error) {
    console.log(error);
  }
};

const getTags = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/blog/tag");
    const data = res.data;

    return data.tag;
  } catch (error) {
    console.log(error);
  }
};

const Page = async () => {
  const blogs: Blog[] = await getBlogs();
  const tags: Tag[] = await getTags();

  return (
    <>
      <div className="flex justify-center ">
        <h3 className="ml-8 text-lg text-gray-900  ">
          <button>All Blog</button>
        </h3>
        <div>
          <BlogTable blogs={blogs} />
        </div>
      </div>
      <div>
        <h3 className="ml-8 text-lg text-gray-900  ">All Tag</h3>
        <div className="flex justify-center ">
          <TagTable tags={tags} />
        </div>
      </div>
    </>
  );
};

export default Page;
