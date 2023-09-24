import axios from "axios";

const getTags = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/blog/tag");
    const data = res.data;
    return data.tag;
  } catch (error) {
    console.log(error);
  }
};

export default getTags;
