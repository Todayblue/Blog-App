import { Blog, Tag } from "@/types/blog";
import axios from "axios";

type TagData = {
  tags: Tag;
  blogCount: number;
  blogs: Blog[];
};

export const getTagBySlug = async (slug: string, page: number, limit: number) => {
  const res = await axios.get(
    `http://localhost:3000/api/blog/tag/${slug}/?page=${page}&limit=${limit}`
  );
  const data: TagData = await res.data;
  const {blogs} = data
  const { tags } = data;
  const { blogCount } = data;

    return {
      tags,
      blogCount,
      blogs,
    };
};
