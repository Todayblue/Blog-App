import { Category } from "@/types/blog";
import Link from "next/link";
import getCategories from "../action/getCategories";

const BlogNavbar = async () => {
  const categories: Category[] = await getCategories();

  return (
    <div>
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="ml-8 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          <Link href={"/blog"}>Blog</Link>
        </h1>
      </div>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/blog/category/${category.name}`}
          className="btn btn-outline mb-8 ml-4"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default BlogNavbar;
