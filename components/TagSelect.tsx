import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Tag } from "@/types/blog";
import axios from "axios";

const TagSelect = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  const getTags = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/blog/tag");
      const data = res.data;

      return data.tag;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchTags() {
      const fetchedTags = await getTags();
      setTags(fetchedTags);
    }

    fetchTags();
  }, []);

  const tagOptions = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  return <CreatableSelect isMulti options={tagOptions} />;
};

export default TagSelect;
