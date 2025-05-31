import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    // Laisser passer les routes publiques
    if (
        pathname === "/" ||
        pathname.startsWith("/login") ||
        pathname.startsWith("/signup") ||
        pathname.startsWith("/api") // tu peux restreindre ça selon besoin
    ) {
        return NextResponse.next();
    }

    // Rediriger vers /login si pas connecté
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        // Vérifie que le token est valide (sinon redirige)
        jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.next();
    } catch (err) {
        console.error("Token invalide", err);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

// On applique le middleware à toutes les pages privées (ex: dashboard)
export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
