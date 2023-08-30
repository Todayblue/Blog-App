import Link from "next/link";
import getTags from "../action/getTags";
import { Blog, Tag } from "@/types/model";

const BlogNavbar = async () => {
  const tags: Tag[] = await getTags();

  return (
    <>
      <div>
        <h1 className="ml-8 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          <Link href={"/blog"}>Blog</Link>
        </h1>
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/blog/tag/${tag.id}`}
            className="btn-sm btn btn-outline ml-4 mt-5 mb-4"
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default BlogNavbar;
