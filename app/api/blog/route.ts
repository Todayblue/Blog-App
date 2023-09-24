import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        tags: true,
        author: true,
      },
    });

    return NextResponse.json(
      { message: "GET Blog successfully", blogs },
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
