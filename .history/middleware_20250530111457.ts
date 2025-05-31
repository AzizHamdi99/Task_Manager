// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const { pathname } = req.nextUrl;

    // Redirect all requests to '/' to '/login'
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Define public paths that don't require authentication
    const publicPaths = ['/login', '/register'];

    // Check if the current path is public
    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

    if (!token && !isPublicPath) {
        // Redirect unauthenticated users to the login page
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (token && pathname === '/login' || token && pathname === '/register') {
        // Redirect authenticated users away from the login page
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

// Apply middleware to all routes except for static files and public paths
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
