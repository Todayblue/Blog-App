import EditBlog from "@/components/Blog/EditBlog";
import { Blog, Tag } from "@/types/blog";
import axios from "axios";
import React from "react";

const getBlogById = async (slug: string) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/blog/${slug}`);
    const data = await res.data;

    return data.blog;
  } catch (error) {
    console.log(error);
  }
};

const getTags = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/blog/tag");
    const data = await res.data;

    return data.tag;
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params }: { params: { slug: string } }) => {
  const blog: Blog = await getBlogById(params.slug);
  const tags: Tag[] = await getTags();

  return (
    <div>
      <EditBlog blog={blog} tags={tags} />
    </div>
  );
};

export default page;
