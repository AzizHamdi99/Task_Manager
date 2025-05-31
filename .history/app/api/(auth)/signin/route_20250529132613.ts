import { connectDb } from "@/libs/db";
import User from "@/models/User";
import bcrypt, { hash } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken"


export async function POST(req: NextRequest) {
    await connectDb()
    const body = await req.json()

    const { email, password } = body
    if (!email || !password) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 })

    }
    if (password.length < 8) {
        return NextResponse.json({ message: "Password must be 8 char al least" }, { status: 400 })
    }
    const user = await User.findOne({ email })

    if (!existingUser) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 400 })

    }
    const matchedPassword = jwt.c





    const token = jwt.sign({
        userId: ._id, role: newUser.role
    }, process.env.JWT_SECRET!, { expiresIn: "7d" })

    const response = NextResponse.json({
        message: "User registred successfully",
        user: {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            role: newUser.role,
        }
    }, { status: 201 })

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    })
    return response
}