import axios from "axios";
import prisma from "./prisma";
import { Blog } from "@/types/blog";

type BlogData = {
  blogCount: number;
  blogs: Blog[];
};

export const getBlogs = async (page: number, limit: number) => {

  try {
    const res = await axios.get(
      `http://localhost:3000/api/blog/?page=${page}&limit=${limit}`
    );

    const data: BlogData = res.data;
    const { blogCount } = data;
    const { blogs } = data;
    return {
      blogCount,
      blogs
    };
  } catch (error) {
    console.log(error);
  }
};
