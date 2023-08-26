import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        blogs: true,
      },
    });

    return NextResponse.json(
      { message: "GET Tag successfully", tags },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Can't Tag", error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    const tag = await prisma.tag.create({
      data: {
        name,
      },
    });
    return NextResponse.json(
      { message: "POST Tag successfully", tag },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can not Tag User", error },
      { status: 500 }
    );
  }
}
