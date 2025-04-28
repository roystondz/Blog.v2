import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });
  }

  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    if (!deletedPost) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(deletedPost);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}