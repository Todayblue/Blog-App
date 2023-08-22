import React from "react";
import BlogNavbar from "../components/BlogNavbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="divide-y divide-gray-200 dark:divide-gray-900">
      <BlogNavbar />
      <div>{children}</div>
    </main>
  );
};

export default layout;
