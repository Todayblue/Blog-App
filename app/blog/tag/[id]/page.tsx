import Card from "@/app/components/Card";
import { Blog, Tag } from "@/types/model";
import { getTagById } from "../../../action/getTagById";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const tag: Tag = await getTagById(params.id);
  const blogs: Blog[] = tag.blogs;

  return (
    <>
      <div className="flex flex-row justify-between leading-9 ">
        <p className="ml-8 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          <Link href={"/blog/tag"}>Tags</Link>
        </p>
        <p className="text-xl font-extrabold tracking-tight mr-8 text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          <Link href={`/blog/tag/${tag.id}`}>{tag.name.toUpperCase()}</Link>
        </p>
      </div>
      <div className="divider divide-gray-200 dark:divide-gray-600 py-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10">
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            id={blog.id}
            title={blog.title}
            content={blog.content}
            coverImage={blog.coverImage}
            tags={blog.tags.map((tag) => tag)}
          ></Card>
        ))}
      </div>
    </>
  );
}
