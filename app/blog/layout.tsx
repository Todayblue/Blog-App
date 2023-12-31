import React from "react";
import BlogNavbar from "../components/BlogNavbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <BlogNavbar />
      <div>{children}</div>
    </main>
  );
};

export default layout;
