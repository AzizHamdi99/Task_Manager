// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const { pathname } = req.nextUrl;

    // Allow access to public routes
    const publicPaths = ['/login', '/signup', '/api'];
    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

    if (!token && !isPublicPath) {
        // Redirect unauthenticated users to the login page
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// Apply middleware to all routes except public ones
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
