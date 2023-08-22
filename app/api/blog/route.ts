import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import slugify from "slugify";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: true,
        category: true,
      },
    });

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
    const { title, content, coverImage, authorId, categoryId } = body;

    const id = nanoid(10).replace(/[_-]/g, "");
    const slug = `${slugify(title, { lower: true })}-${id}`;

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        coverImage,
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
