import CreateBlog from "@/app/components/CreateBlog";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  return <CreateBlog userId={userId} />;
};

export default page;
