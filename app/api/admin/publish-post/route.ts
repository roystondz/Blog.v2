import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { id } = await request.json();
    
    try {
        const post = await prisma.post.update({
        where: { id },
        data: { published: true },
        });
    
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: "Failed to publish post" }, { status: 500 });
    }
}