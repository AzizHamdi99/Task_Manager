import { NextResponse, NextRequest } from "next/server";

import jwt from "jsonwebtoken"

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value

    const { pathname } = req.nextUrl

    if (
        pathname.startsWith("/login") ||
        pathname.startsWith("/signup") ||
        pathname.startsWith("/api") ||
        pathname === "/"
    ) {
        return NextResponse.next();
    }

    if (!token) {

    }

}