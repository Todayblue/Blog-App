import CreateBlog from "@/app/components/CreateBlog";
import React from "react";

const getCategories = async () => {
  const res = await fetch("http://localhost:3000/api/category");
  const data = await res.json();

  return data.categories;
};

const page = async () => {
  const categories = await getCategories();

  return <CreateBlog categories={categories} />;
};

export default page;
