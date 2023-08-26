import axios from "axios";
import { Category } from "@/types/blog";

export default async function getBlogs() {
  try {
    const res = await axios.get("http://localhost:3000/api/blog");
    const data = res.data;

    return data.blogs;
  } catch (error) {
    console.log(error);
  }
}
