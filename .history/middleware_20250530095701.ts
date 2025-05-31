import { NextResponse, NextRequest } from "next/server";

import jwt from "jsonwebtoken"

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value

    const pathNa

}