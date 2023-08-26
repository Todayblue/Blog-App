import React from "react";
import Card from "../components/Card";
import getBlogs from "../action/getBlogs";
import { Blog } from "@/types/model";

const page = async () => {
  const blogs: Blog[] = await getBlogs();
  // console.log(blogs);

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-12 gap-10">
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            id={blog.id}
            title={blog.title}
            content={blog.content}
            coverImage={blog.coverImage}
            tags={blog.tags.map((tag) => tag)}
          ></Card>
        ))}
      </div>
    </main>
  );
};

export default page;

{
  /* <div>
  <Card
    id={blogs.id}
    key={blogs.id}
    title={blogs.title}
    coverImage={blogs.coverImage}
    content={blogs.content}
    tags={blogs.tags}
  ></Card>
</div> */
}
