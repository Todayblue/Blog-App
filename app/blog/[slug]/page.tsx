"use client";
import BlogPage from "@/components/Blog/BlogPage";
import { getBlogBySlug } from "@/lib/getBlogBySlug";

import { useQuery } from "@tanstack/react-query";

const Page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
  });

  return <BlogPage isLoading={isLoading} blog={blog} />;
};

export default Page;
