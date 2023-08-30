import { Blog } from "@/types/blog";
import Image from "next/image";

const getPost = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();

  return data.blog;
};

export default async function Page({ params }: { params: { id: string } }) {
  const post: Blog = await getPost(params.id);
  // console.log("----------------------------------------", post);

  return (
    <div className="flex flex-col justify-center items-center m-6 gap-6">
      {/* <h3 className="text-2xl font-bold">{post.author.name}</h3> */}
      <p className="text-3xl font-semibold ">{post.title}</p>
      <Image src={post.coverImage} alt="coverImage" width={720} height={576} />
      <div
        className="content "
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </div>
  );
}
