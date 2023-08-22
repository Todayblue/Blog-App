import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cid = params.id; // 'a', 'b', or 'c'
  // console.log("cid", cid);

  const res = await prisma.category.findMany({
    where: {
      id: cid,
    },
    include: {
      blogs: true,
    },
  });
  return NextResponse.json(res);
}
