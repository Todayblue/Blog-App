import getCategories from "@/app/action/getCategories";
import CreateBlog from "@/app/components/CreateBlog";
import { Category } from "@/types/blog";
import React from "react";

const page = async () => {
  const categories: Category[] = await getCategories();

  return <CreateBlog categories={categories} />;
};

export default page;
