import { calSkip } from "@/lib/calSkip";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page")
  const limit = searchParams.get("limit")

  if (!page || !limit) {
    throw new Error("Both 'page' and 'limit' parameters are required.");
  }

  const parsedPage = parseInt(page, 10);
  const parsedLimit = parseInt(limit, 10);
  const skip = calSkip(parsedPage, parsedLimit);

  try {
    const blogs = await prisma.blog.findMany({
      skip: skip,
      take: parsedLimit,
      include: {
        tags: true,
        author: true,
      },
    });

    const blogCount = await prisma.blog.count();

    return NextResponse.json(
      { message: "GET Blog successfully", blogCount, blogs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can't GET Blog", error },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const { title, tagName, content, coverImage, authorId } =
      await request.json();

    const slugify = require("slugify");
    const blogSlug: string = slugify(title).toLowerCase();

    const tagSlugs = tagName.map((tagSlug:string[]) => ({
      slug: slugify(tagSlug).toLowerCase(),
    }));

    const posts = await prisma.blog.create({
      data: {
        title,
        slug: blogSlug,
        content,
        coverImage,
        authorId,
        tags: {
          connect: tagSlugs, // Use connect to establish relationships with existing tags
        },
      },
      include: {
        tags: true
      }
    });
    return NextResponse.json(
      { message: "POST Blog successfully", posts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can not POST Blog", error },
      { status: 500 }
    );
  }
}
