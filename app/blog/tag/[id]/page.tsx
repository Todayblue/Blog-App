import Card from "@/app/components/Card";
import { Tag } from "@/types/model";
import axios from "axios";
import { getTagById } from "../../../action/getTagById";

export default async function Page({ params }: { params: { id: string } }) {
  // const categoryData: Category[] = await getCategory(params.id);
  console.log(params.id);

  const tag: Tag = await getTagById(params.id);
  const blogs = tag.blogs.map((blog) => blog);
  console.log("blogs ==========", blogs);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-12 gap-10">
      {/* {tag.map((tag) => (
        <Card
          key={tag.id}
          id={tag.id}
          title={tag.}
          content={tag.content}
          coverImage={tag.coverImage}
          tags={tag.tags.map((tag) => tag)}
        ></Card>
      ))} */}
      {blogs.map((blog) => (
        <Card
          id={blog.id}
          key={blog.id}
          title={blog.title}
          content={blog.content}
          coverImage={blog.coverImage}
          tags={blog.tags.map((tag) => tag)}
        />
      ))}
    </div>
  );
}

//  <>
//     {/* <div className="grid h-52 text-4xl md:text-5xl card rounded-box place-items-center">
//       <h1>{categoryData.map((cat) => cat.name)}</h1>
//     </div> */}
//     <div className="divider divide-gray-200 dark:divide-gray-900"></div>

//     {categoryData.length <= 0 ? (
//       <h3 className="text-4xl md:text-5xl font-bold text-center mt-8">
//         No Posts.
//       </h3>
//     ) : (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-12 gap-10">
//         {categoryData.map((category) =>
//           category.blogs.map((blog) => blog.categories)
//         )}
//       </div>
//       // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-12 gap-10">
//       //   {categoryData.map((cat) =>
//       //     cat.blogs.map((blog) => (
//       //       <Card
//       //         key={blog.id}
//       //         id={blog.id}
//       //         slug={blog.slug}
//       //         title={blog.title}
//       //         content={blog.content}
//       //         cover={blog.coverImage}
//       //         categories={blog.categories}
//       //       />
//       //     ))
//       //   )}
//       // </div>
//     )}
//   </>
