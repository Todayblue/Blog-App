import axios from "axios";

export const getTagById = async (id: string) => {
  try {
    // /api/blog?category=cat
    const response = await axios.get(`http://localhost:3000/api/tag/${id}`);
    const data = response.data;

    return data.tags;
  } catch (error) {
    console.error(error);
  }
};
