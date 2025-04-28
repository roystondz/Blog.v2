import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('id');

    if (!postId) {
        return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}