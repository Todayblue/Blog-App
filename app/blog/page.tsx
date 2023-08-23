import React from "react";
import Card from "../components/Card";
import { Blog as BlogType } from "@/types/blog";

const getBlogs = async () => {
  const res = await fetch(`http://localhost:3000/api/blog`, {
    cache: "no-cache",
    next: {
      tags: ["blogs"],
    },
  });
  const data = await res.json();

  return data && data.blogs;
};

const page = async () => {
  const blogs: BlogType[] = await getBlogs();

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-12 gap-10">
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            id={blog.id}
            slug={blog.slug}
            title={blog.title}
            content={blog.content}
            cover={blog.coverImage}
            category={blog.category.name}
          />
        ))}
      </div>
    </main>
  );
};

export default page;
