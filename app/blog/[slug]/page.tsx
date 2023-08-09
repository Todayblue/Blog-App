import { Blog } from "@/types/blog";

const getPost = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();

  return data.post;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const post: Blog = await getPost(params.slug);

  return (
    <div>
      My Post: {post.title}
      <p>{post.content}</p>
    </div>
  );
}
