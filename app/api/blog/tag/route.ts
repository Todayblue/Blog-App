import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tag = await prisma.tag.findMany({
      include: {
        blogs: true,
      },
    });

    return NextResponse.json(
      { message: "GET Users successfully", tag },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can't GET Users", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const slugify = require('slugify')
    const tagSlug: string = slugify(name).toLowerCase();

    const tag = await prisma.tag.create({
      data: {
        name,
        slug: tagSlug
      },
    });


    return NextResponse.json(
      { message: "POST tag successfully", tag },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating tag", error },
      { status: 500 }
    );
  }
}
