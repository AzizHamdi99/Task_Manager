// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

async function getUserRoleFromToken(token: string | undefined): Promise<string | null> {
    if (!token) return null

    try {
        const { payload } = await jwtVerify(token, secret)
        return payload.role as string
    } catch (error) {
        return null
    }
}

export async function middleware(req: NextRequest) {
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

    const role = await getUserRoleFromToken(token)
    if (!role) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (
        pathname.startsWith('/dashboard/updateTask') ||
        pathname.startsWith('/dashboard/teamMembers') ||
        pathname.startsWith('/dashboard/create-task')
    ) {
        if (role !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', req.url))
        }
    }

    if (pathname.startsWith('/dashboard/task/')) {
        if (role !== 'user') {
            return NextResponse.redirect(new URL('/unauthorized', req.url))
        }
    }

    return NextResponse.next();
}

// Apply middleware to all routes except for static files and public paths
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
