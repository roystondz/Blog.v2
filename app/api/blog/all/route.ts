import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    try {
        const blogs = await prisma.post.findMany({
            where: {
                title: {
                    contains: search || "",
                },
                category: {
                    contains: category || "",
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}
