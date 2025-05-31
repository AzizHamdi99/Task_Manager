// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const { pathname } = req.nextUrl;

    // Define public paths that don't require authentication
    const publicPaths = ['/login', '/signup', '/api'];

    // Check if the current path is public
    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

    if (!token && !isPublicPath) {
        // Redirect unauthenticated users to the login page
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    if (token && pathname === '/login') {
        // Redirect authenticated users away from the login page
        const homeUrl = new URL('/', req.url);
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
}

// Apply middleware to all routes except for static files and public paths
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
