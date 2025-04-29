import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    try {
        const user = await prisma.user.findUnique({
        where: {
            id: id || undefined,
        },
        });
    
        if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}