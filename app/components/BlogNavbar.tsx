import Link from "next/link";
import getTags from "../action/getTags";
import { Tag } from "@/types/model";

const BlogNavbar = async () => {
  const tags: Tag[] = await getTags();

  return (
    <div>
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="ml-8 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          <Link href={"/blog"}>Blog</Link>
        </h1>
      </div>
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={`/blog/tag/${tag.id}`}
          className="btn btn-outline mb-8 ml-4"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
};

export default BlogNavbar;
