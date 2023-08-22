import axios from "axios";
import { Category } from "@/types/blog";

export default async function getCategories() {
  try {
    const res = await axios.get("http://localhost:3000/api/category");
    const data = res.data;

    return data.categories;
  } catch (error) {
    console.log(error);
  }
}
