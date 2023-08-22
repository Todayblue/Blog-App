import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json(
      { message: "GET Categories Successfully", categories },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can't GET Categories", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    return NextResponse.json(
      { message: "POST Category Successfully", category },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can not POST category", error },
      { status: 500 }
    );
  }
}
