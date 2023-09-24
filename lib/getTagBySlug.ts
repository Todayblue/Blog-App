export const getTagBySlug = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/tag/${slug}`);
  const data = await res.json();

  return data.tags;
};
