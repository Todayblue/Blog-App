import prisma from "@/lib/prisma";
import { Blog } from "@/types/model";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = parseInt(params.id);
    const blog = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
      include: {
        tags: true,
        // author: true,
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
    const { title, content, coverImage, authorId, tags }: Blog =
      await request.json();
    const blogId = parseInt(params.id);

    const updateBlog = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        title,
        content,
        coverImage,
        authorId,
        tags: {
          connect: tags.map((tag) => ({ id: tag.id })),
        },
      },
    });
    return NextResponse.json(
      { message: "UPDATE Blog successfully", updateBlog },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can't UPDATE Blog", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const blogId = parseInt(params.id);
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
      { message: "Can't DELETE Blog", error },
      { status: 500 }
    );
  }
}
