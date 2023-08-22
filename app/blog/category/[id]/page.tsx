import Card from "@/app/components/Card";
import { Category } from "@/types/blog";
import axios from "axios";

const getCategory = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/category/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default async function Page({ params }: { params: { id: string } }) {
  const categoryData: Category[] = await getCategory(params.id);

  return (
    <div>
      {categoryData.map((category) => (
        <div
          className="grid grid-cols-1 md:grid-cols-2 py-12 px-40 gap-36"
          key={category.id}
        >
          {category.blogs.map((blog) => (
            <Card
              key={blog.id}
              id={blog.id}
              slug={blog.slug}
              title={blog.title}
              content={blog.content}
              cover={blog.coverImage}
              category={category.name}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
