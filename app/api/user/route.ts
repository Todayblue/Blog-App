import prisma from "@/utils/prisma"
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.user.findMany();
    
    return NextResponse.json({ message: "GET User successfully", categories }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Can't GET Categories", error }, { status: 500 })
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name} = body;

    const user = await prisma.user.create({
      data: {
        email, name
      }
    });
    return NextResponse.json({ message: "POST User successfully", user }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Can not POST User", error }, { status: 500 })
  }
}
