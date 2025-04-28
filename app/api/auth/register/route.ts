import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 409 }
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}