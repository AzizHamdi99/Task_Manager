import { connectDb } from "@/libs/db";
import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";




export async function PUT(req: NextRequest) {

    await connectDb()

    const { taskId, index, state } = req.body;

    try {
        const task = Task.findById(taskId)
        if (!task) return NextResponse.json({ message: "Task not found" });

        task.todoCheckList[index]





    } catch (error) {
        console.error('Error in updating todo:', error);
        return NextResponse.json({ message: 'Server error', error }, { status: 500 });

    }






}