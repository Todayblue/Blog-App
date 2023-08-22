import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = params.id;

    const blog = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
    });
    return NextResponse.json(
      { message: "GET Blog successfully", blog },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can't GET Blog", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content, coverImage, authorId, categoryId } =
      await request.json();
    const blogId = params.id;
    console.log("blogId", blogId);

    const updateBlog = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        title,
        content,
        coverImage,
        authorId,
        categoryId,
      },
    });
    return NextResponse.json(
      { message: "UPDATE Blog successfully", updateBlog },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can't UPDATE Blogs", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const blogId = request.url.split("/blog/")[1];
  try {
    const deleteBlog = await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });
    return NextResponse.json(
      { message: "DELETE Blog Successfully", deleteBlog },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can't DELETE Blogs", error },
      { status: 500 }
    );
  }
}
