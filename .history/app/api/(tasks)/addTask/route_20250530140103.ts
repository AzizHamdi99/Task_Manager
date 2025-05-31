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
    const newTask = await Task.create({
        title,
        description,
        priority,
        status,
        dueDate, assignedTo, createdBy,
        attachments, todoCheckList, progress
    })

    const response =
    return response
}