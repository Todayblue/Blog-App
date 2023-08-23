import Card from "@/app/components/Card";
import { Blog as BlogType } from "@/types/blog";
import axios from "axios";

const getCategory = async (id: string) => {
  try {
    // /api/blog?category=cat
    const response = await axios.get(`http://localhost:3000/api/blog`, {
      params: { category: id },
    });

    return response.data.blogs;
  } catch (error) {
    console.error(error);
  }
};

export default async function Page({ params }: { params: { id: string } }) {
  const categoryData: BlogType[] = await getCategory(params.id);

  return (
    <>
      <div className="grid h-52 text-4xl md:text-5xl card rounded-box place-items-center">
        <h1>{params.id}</h1>
      </div>
      <div className="divider divide-gray-200 dark:divide-gray-900"></div>

      {categoryData.length <= 0 ? (
        <h3 className="text-4xl md:text-5xl font-bold text-center mt-8">
          No Posts.
        </h3>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10 pb-12 gap-10">
          {categoryData.map((blog) => (
            <Card
              key={blog.id}
              id={blog.id}
              slug={blog.slug}
              title={blog.title}
              content={blog.content}
              cover={blog.coverImage}
              category={blog.category.name}
            />
          ))}
        </div>
      )}
    </>
  );
}
