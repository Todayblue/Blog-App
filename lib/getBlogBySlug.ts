import axios from "axios";

export const getBlogBySlug = async (slug: string) => {
  const res = await axios(`http://localhost:3000/api/blog/${slug}`);
  const data = await res.data;

  return data.blog;
};
