import axios from "axios";
import { Category } from "@/types/blog";

export default async function getTags() {
  try {
    const res = await axios.get("http://localhost:3000/api/tag");
    const data = res.data;

    return data.tags;
  } catch (error) {
    console.log(error);
  }
}
