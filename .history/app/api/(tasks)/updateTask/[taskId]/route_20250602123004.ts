import { connectDb } from "@/libs/db";
import Task from "@/models/Task";
import { NextRequest } from "next/server";



export async function PUT(req: NextRequest, { params }: { params: { taskId: string } }) {

    await connectDb()

    const taskId = params.taskId
    const data = req.json()

    try {
        const updateTask = await Task.findByIdAndUpdate(taskId, data, {
            new: true,
            runValidators: true
        })
        if (!updatedTask) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json(updatedTask, { status: 200 });

    } catch (error) {

    }

}