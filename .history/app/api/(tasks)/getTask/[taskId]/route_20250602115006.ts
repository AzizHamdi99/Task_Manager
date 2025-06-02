import { connectDb } from "@/libs/db";
import Task from "@/models/Task";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: { taskId: string };
}

export async function GET(
    req: NextRequest,
    { params }: Params
) {
    try {
        await connectDb();

        const taskId = params.taskId.trim();

        if (!taskId) {
            return NextResponse.json({ message: "Missing taskId" }, { status: 400 });
        }
        const task = await Task.findById(taskId)
        if (!task) {
            return NextResponse.json({ message: "task not found" }, { status: 400 });

        }

        return NextResponse.json(task)


    } catch (error) {
        console.error("Error fetching task:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
