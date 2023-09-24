// import PaginationControls from "@/components/PaginationControls";
// import { getBlogs } from "@/lib/getBlogs";
// import { Blog } from "@/types/blog";
// import { UseQueryResult, useQuery } from "@tanstack/react-query";
// export default function Page({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
// }) {
//   const { data, isLoading }: UseQueryResult<Blog[]> = useQuery({
//     queryKey: ["blogs"],
//     queryFn: getBlogs,
//   });

//   const page = searchParams["page"] ?? "1";
//   const per_page = searchParams["per_page"] ?? "5";

//   // mocked, skipped and limited in the real app
//   const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
//   const end = start + Number(per_page); // 5, 10, 15 ...

//   const blogs = data?.slice(start, end);

//   return (
//     <div className="flex flex-col gap-2 items-center">
//       {blogs?.map((blog: Blog) => <p key={blog.id}>{blog.title}</p>)}

//       <PaginationControls
//         hasNextPage={end < data.length}
//         hasPrevPage={start > 0}
//       />
//     </div>
//   );
// }
