import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}


export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/post/")[1];

    console.log(id);


    const post = await prisma.blog.findFirst({ where: { id } });
    if (!post)
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// export default async function getBlogsById(
//   params: IParams
// ) {
//   try {
//     const { id } = params;

//     console.log(id);


//     const post = await prisma.post.findUnique({
//       where: {
//         id: id,
//       },
//     });

//     if (!post) {
//       return null;
//     }
//     return {
//       ...post,
//       createdAt: post.createdAt.toString()
//     }
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }


