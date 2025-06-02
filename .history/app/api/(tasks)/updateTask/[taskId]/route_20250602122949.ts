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

    } catch (error) {

    }

}