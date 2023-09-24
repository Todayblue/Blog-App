// "use client";
// import React, { useState } from "react";
// import BlogList from "@/components/Blog/BlogList";
// import { getBlogs } from "@/lib/getBlogs";
// import { useQuery } from "@tanstack/react-query";
// import { Tag } from "../../types/blog";
// import Link from "next/link";
// import getTags from "@/lib/getTags";
// import axios from "axios";

// const Page = () => {
//   const fetchBlogs = async (page = 0) => {

//       const response = await fetch(
//         `http://localhost:3000/api/blog?page==${page}&_limit=${ITEM_PER_PAGE}`
//       );
//       const totalData = response.headers.get("X-Total-Count");
//       const data = await response.json();
//       return {
//         products: data,
//         totalData,
//       };

//     try {
//       const res = await axios.get(
//         "http://localhost:3000/api/blog?page=" + page
//       );

//       const data = res.data;

//       return data.blogs;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const [page, setPage] = useState(0);
//   const blogsQuery = useQuery({ queryKey: ["blogs"], queryFn: getBlogs });
//   const tagsQuery = useQuery({ queryKey: ["tags"], queryFn: getTags });

//   const { isLoading, isError, error, data, isFetching, isPreviousData } =
//     useQuery({
//       queryKey: ["blogs", page],
//       queryFn: () => fetchBlogs(page),
//       keepPreviousData: true,
//     });

//   return (
//     <main>
//       <div className="flex flex-col">
//         <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-5xl md:leading-14">
//           All Posts
//         </h1>
//         <div className="divider my-2"></div>
//         <ul className="flex flex-wrap">
//           {tagsQuery.isLoading ? (
//             <div className="flex items-center mx-16 justify-center">
//               <span className="loading loading-spinner loading-sm"></span>
//             </div>
//           ) : (
//             <div className="flex flex-row flex-wrap">
//               <div className="mr-4 text-gray-900">Tags</div>
//               {tagsQuery.data.map((tag: Tag) => (
//                 <li key={tag.id}>
//                   <Link
//                     href={`/blog/tag/${tag.slug}`}
//                     className=" hover:text-sky-500 capitalize text-gray-500 text-sm font-medium mr-4 "
//                   >
//                     {tag.name.toLowerCase()}
//                   </Link>
//                 </li>
//               ))}
//             </div>
//           )}
//         </ul>
//       </div>

//       {blogsQuery.isLoading ? (
//         <div className="flex items-center justify-center my-56">
//           <span className="loading loading-spinner loading-sm"></span>
//         </div>
//       ) : (
//         <div className="my-6">
//           <BlogList blogs={blogsQuery.data} />
//         </div>
//       )}
//     </main>
//   );
// };

// export default Page;
