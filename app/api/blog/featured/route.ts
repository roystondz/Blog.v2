import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    
    try {
        const blogs = await prisma.post.findMany({
            
            orderBy: {
                createdAt: "desc",
            },
            take: 6
        });

        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}
