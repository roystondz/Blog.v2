import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";



    export async function GET(req: NextRequest) {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");

        if (!category) {
            return NextResponse.json({ error: "Category is required" }, { status: 400 });
        }

        try {
            const relatedBlogs = await prisma.post.findMany({
                where: {
                    category: category,
                },
            });

            return NextResponse.json(relatedBlogs);
        } catch (error) {
            return NextResponse.json({ error: "Failed to fetch related blogs" }, { status: 500 });
        }
    }
