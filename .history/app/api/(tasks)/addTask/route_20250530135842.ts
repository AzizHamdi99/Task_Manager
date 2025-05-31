import { connectDb } from "@/libs/db";
import User from "@/models/User";

import { NextRequest, NextResponse } from "next/server";

import Task from "@/models/Task";


export async function POST(req: NextRequest) {
    await connectDb()
    const body = await req.json()
    const { title, description, priority, status, dueDate, assignedTo, createdBy, attachments, todoCheckList, progress } = body


    if (!title || !dueDate ||) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 })

    }
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