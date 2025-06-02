import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

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

    // Allow access to public pages without a token
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        if (token && (pathname === '/login' || pathname === '/register')) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }
        return NextResponse.next();
    }

    // Block access if there's no token
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    const role = await getUserRoleFromToken(token);
    if (!role) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Admin-only routes
    const adminOnlyPaths = [
        '/dashboard/updateTask/',
        '/dashboard/create-task/',
        '/dashboard/teamMembers/',
    ];

    if (adminOnlyPaths.some((path) => pathname.startsWith(path))) {
        if (role !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }

    // User-only route: /dashboard/task/[taskId]
    /* if (pathname.startsWith('/dashboard/task/')) {
         if (role !== 'user') {
             return NextResponse.redirect(new URL('/unauthorized', req.url));
         }
     }*/

    // All other authenticated routes
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
