import { connectDb } from "@/libs/db";
import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(req: NextRequest, { params }: { params: { taskId: string } }) {

    await connectDb()

    const taskId = params.taskId.trim()
    const data = await req.json()

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, data, {
            new: true,
            runValidators: true
        })
        if (!updatedTask) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json(updatedTask, { status: 200 });

    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ message: 'Server error', error }, { status: 500 });

    }

}