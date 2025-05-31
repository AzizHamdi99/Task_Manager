import { connectDb } from "@/libs/db";
import User from "@/models/user";
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


}