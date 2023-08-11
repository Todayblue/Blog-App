import Card from "../components/Card";
import { Blog as BlogType } from "@/types/blog";

const getBlogs = async () => {
  const res = await fetch(`http://localhost:3000/api/blog`, {
    cache: "no-store",
  });
  const data = await res.json();

  return data && data.blogs;
};

export default async function Blog() {
  const blogs: BlogType[] = await getBlogs();

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700 ">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="ml-8 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Blog
          </h1>
        </div>
        
        <button className="btn btn-outline mb-8 ml-4">Dog Behavior</button>
        <button className="btn btn-outline mb-8 ml-4">Dog Health</button>
        <button className="btn btn-outline mb-8 ml-4">Dog Train</button>
          <div className="grid grid-cols-1 md:grid-cols-2 py-12 px-40 gap-10">
            
            {blogs.map((blog) => (
              <Card
                key={blog.id}
                id={blog.id}
                title={blog.title}
                content={blog.content}
                cover={blog.coverImage}
                category={blog.category.name}
              />
            ))}
     
          </div>
        
      </div>
    </>
  );
}
