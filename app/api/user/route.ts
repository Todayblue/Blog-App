import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        blogs: true,
      },
    });

    return NextResponse.json(
      { message: "GET Users successfully", users },
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

    const user = await prisma.user.create({
      data: {
        name,
      },
    });
    return NextResponse.json(
      { message: "POST User successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can not POST User", error },
      { status: 500 }
    );
  }
}
