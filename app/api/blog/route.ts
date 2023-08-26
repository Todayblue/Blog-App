import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Blog } from "@/types/model";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        tags: true,
        // author: true,
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

type BlogType = {
  id: number;
  createdAt: Date;
  title: string;
  content: string;
  coverImage: string;
  authorId: number;
  tags: number[];
};

export async function POST(request: Request) {
  try {
    const { title, tags, content, coverImage, authorId }: BlogType =
      await request.json();
    const tagIds = tags.map((tagId) => ({ id: tagId }));

    const posts = await prisma.blog.create({
      data: {
        title,
        content,
        coverImage,
        authorId,
        tags: {
          connect: tagIds, // Use connect to establish relationships with existing tags
        },
      },
    });
    return NextResponse.json(
      { message: "POST Post successfully", posts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can not POST Posts", error },
      { status: 500 }
    );
  }
}
