import { connectDb } from "@/libs/db";
import User from "@/models/user";
import bcrypt, { hash } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    await connectDb()
    const body = await req.json()

    const { fullname, email, password, code, pic } = body
    if (!fullname || !email || !password) {
        return NextResponse.json({ message: "Missong fields" }, { status: 400 })

    }
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        return NextResponse.json({ message: "Email already in use" }, { status: 400 })

    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        fullname,
        email, pic,
        password: hashedPassword,
        role: code === process.env.
    })


}