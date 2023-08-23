import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import slugify from "slugify";

export async function GET(request: NextRequest) {
  // Ref: https://nextjs.org/docs/app/api-reference/functions/next-request
  // GET /api/blog?category=cat -> filter only category cat
  const searchParams = request.nextUrl.searchParams;
  const categoryQuery = searchParams.get("category");

  try {
    let blogs;

    if (categoryQuery) {
      blogs = await prisma.blog.findMany({
        include: {
          author: true,
          category: true,
        },
        where: {
          category: {
            name: {
              contains: categoryQuery,
              mode: "insensitive", // Case-insensitive search
            },
          },
        },
      });
    } else {
      blogs = await prisma.blog.findMany({
        include: {
          author: true,
          category: true,
        },
      });
    }

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

export async function POST(request: NextRequest) {
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
