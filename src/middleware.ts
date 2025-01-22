import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface MiddlewareRequest extends NextRequest {
    url: string;
}

export async function middleware(req: MiddlewareRequest): Promise<NextResponse> {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    return NextResponse.next();
}

export const config = {
  matcher: ["/((?!auth).*)"], // Protect everything except /auth and its subpaths
};
