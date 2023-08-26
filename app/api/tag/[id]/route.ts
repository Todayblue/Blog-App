import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tagId = parseInt(params.id);

    const tags = await prisma.tag.findFirst({
      where: {
        id: tagId,
      },
      include: {
        blogs: true,
      },
    });
    return NextResponse.json(
      { message: "GET Tag successfully", tags },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can't Tag User", error },
      { status: 500 }
    );
  }
}

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { title, content, coverImage, authorId, categoryId } =
//       await request.json();
//     const blogId = params.id;
//     console.log("blogId", blogId);

//     const updateBlog = await prisma.blog.update({
//       where: {
//         id: blogId,
//       },
//       data: {
//         title,
//         content,
//         coverImage,
//         authorId,
//       },
//     });
//     return NextResponse.json(
//       { message: "UPDATE Blog successfully", updateBlog },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Can't UPDATE Blogs", error },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tagId = parseInt(params.id);
  try {
    const deleteTag = await prisma.tag.delete({
      where: {
        id: tagId,
      },
    });
    return NextResponse.json(
      { message: "DELETE Tag Successfully", deleteTag },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Can't Tag User", error },
      { status: 500 }
    );
  }
}
