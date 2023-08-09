import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany();

    return NextResponse.json(
      { message: "GET Blogs Successfully", blogs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can't GET Blogs", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, coverImage, published, authorId, categoryId } =
      body;

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        coverImage,
        published,
        authorId,
        categoryId,
      },
    });
    return NextResponse.json(
      { message: "POST blog successfully", blog },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can not POT blog", error },
      { status: 500 }
    );
  }
}
