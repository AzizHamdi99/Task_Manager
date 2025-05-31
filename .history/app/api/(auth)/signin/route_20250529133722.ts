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

    if (!user) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 400 })

    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 400 })

    }
    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    );






    const response = NextResponse.json({
        message: "Login successfully",
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            pic: user.pic
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