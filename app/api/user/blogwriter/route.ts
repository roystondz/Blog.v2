import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try{
        const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        return NextResponse.json(user, { status: 200 });
    }catch (error) {
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}