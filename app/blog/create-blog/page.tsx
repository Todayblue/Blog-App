import getCategories from "@/app/action/getCategories";
import CreateBlog from "@/app/components/CreateBlog";
import { authOptions } from "@/lib/auth";
import { Category } from "@/types/blog";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);

  const categories: Category[] = await getCategories();

  return <CreateBlog userId={session?.user?.id} categories={categories} />;
};

export default page;
