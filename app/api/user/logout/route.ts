import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
}