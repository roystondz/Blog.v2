import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    jwt.verify(token?.value, process.env.JWT_KEY!); // Verify token validity
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

// Apply only to protected routes
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
