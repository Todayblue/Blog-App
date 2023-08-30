import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { q: query } = req.query;
  console.log(query);

  return NextResponse.json(
    { message: "GET Users successfully" },
    { status: 200 }
  );
}
