import axios from "axios";

export const getBlogs = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/blog");


    const data = res.data;

    return data.blogs;
  } catch (error) {
    console.log(error);
  }
};
