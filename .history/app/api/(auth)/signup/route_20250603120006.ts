import { connectDb } from "@/libs/db";
import User from "@/models/User";
import bcrypt, { hash } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken"
import cloudinary from "@/libs/cloudinary";


export async function POST(req: NextRequest) {
    await connectDb()
    const body = await req.json()

    const { fullname, email, password, code, pic } = body
    if (!fullname || !email || !password) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 })

    }
    if (password.length < 8) {
        return NextResponse.json({ message: "Password must be 8 char al least" }, { status: 400 })
    }
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        return NextResponse.json({ message: "Email already in use" }, { status: 400 })

    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const uploadResponse = await cloudinary.uploader.upload(pic)

    //const updateUser = await User.findByIdAndUpdate(userID, { profilePic: uploadResponse.secure_url }, { new: true })

    const newUser = await User.create({
        fullname,
        email,
        pic: uploadResponse.secure_url,
        password: hashedPassword,
        role: code === process.env.ADMIN_CODE ? "ADMIN" : "USER"
    })

    const token = jwt.sign({
        userId: newUser._id, role: newUser.role
    }, process.env.JWT_SECRET!, { expiresIn: "7d" })

    const response = NextResponse.json({
        message: "User registred successfully",
        user: {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            role: newUser.role,
            pic: newUser.pic
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