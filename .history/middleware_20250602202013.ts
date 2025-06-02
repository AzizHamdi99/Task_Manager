import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

async function getUserRoleFromToken(token: string | undefined): Promise<string | null> {
    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, secret);
        return payload.role as string;
    } catch (error) {
        return null;
    }
}

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const { pathname } = req.nextUrl;

    const publicPaths = ['/login', '/register'];
    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

    // Redirect '/' to '/login'
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // If no token and trying to access protected route → redirect to login
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    const role = await getUserRoleFromToken(token);

    // If token is invalid, redirect to login
    if (!role && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // If already logged in, prevent access to /login or /register
    if (role && isPublicPath) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Admin-only routes
    if (
        pathname.startsWith('/dashboard/updateTask') ||
        pathname.startsWith('/dashboard/TeamMembers') ||
        pathname.startsWith('/dashboard/create-task')
    ) {
        if (role !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }

    // User-only routes
    if (pathname.startsWith('/dashboard/task/')) {
        if (role !== 'user') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
