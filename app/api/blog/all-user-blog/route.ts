import {NextResponse} from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    

    if (!userId ) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    try {
        const blog = await prisma.post.findMany({
            where: {
                authorId: userId,
            },
        });

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}