import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
    const body = await request.json();
    const { id, name, email, password, profileImage, bio, website,location ,Twitter,Instagram} = body;
    
    try {
        const user = await prisma.user.update({
        where: { id },
        data: {
            name,
            email,
            password,
            profileImage,
            bio,
            website,
            location,
            Twitter,
            Instagram,
        },
        });
    
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response("Error updating user", { status: 500 });
    }
    }