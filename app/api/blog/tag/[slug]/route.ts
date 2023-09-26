import { calSkip } from "@/lib/calSkip";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  if (!page || !limit) {
    throw new Error("Both 'page' and 'limit' parameters are required.");
  }

  const parsedPage = parseInt(page, 10);
  const parsedLimit = parseInt(limit, 10);
  const skip = calSkip(parsedPage, parsedLimit);

  try {
    const tagslug = params.slug;

    const tags = await prisma.tag.findFirst({
      where: {
        slug: tagslug,
      },
    });
    const blogs = await prisma.blog.findMany({
      skip: skip,
      take: parsedLimit,
      where: {
        tags: {
          some: {
            slug: tagslug,
          },
        },
      },
      include: {
        author: true,
        tags: true,
      },
    });

    const blogCount = await prisma.blog.count({
      where: {
        tags: {
          some: {
            slug: tagslug,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "GET Tag successfully", blogs, tags, blogCount },
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
