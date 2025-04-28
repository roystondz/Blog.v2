import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.error("Invalid JSON body:", error);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { title, content, category, image } = body;
  console.log("Received data:", { title, content, category, image });

  const cookieStore = cookies(); // no await here
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_KEY!) as { id: string };
    console.log("Decoded token:", decoded);
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (!decoded?.id) {
    return NextResponse.json({ error: "Invalid token structure" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newBlogPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: decoded.id,
        category,
        image,
      },
    });

    return NextResponse.json(newBlogPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
