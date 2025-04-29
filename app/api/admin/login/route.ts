import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password } = await request.json();
    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email ,
            role: "ADMIN"
        },
    });
    if (!user) {
        return NextResponse.json(
            { error: "Invalid email or password" },
            { status: 401 }
        );
    }
    let isPasswordValid = false;

    // Compare password
    if (user.password) {    
        isPasswordValid = await bcrypt.compare(password, user.password);
    }
    if (!isPasswordValid) {
        return NextResponse.json(
            { error: "Invalid email or password" },
            { status: 401 }
        );
    }
    // Generate JWT token
    const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_KEY!, {
        expiresIn: "1h",
    });
    // Set token in cookies
    const cookieStore = cookies();
    (await cookieStore).set("token", token, {
        httpOnly: true,
    });
    return NextResponse.json({ token }, { status: 200 });
    // return NextResponse.json({ message: "Login successful" }, { status: 200 });
    // return NextResponse.json({ token }, { status: 200 });
}