import { connectDb } from "@/libs/db";
import User from "@/models/User";

import { NextRequest, NextResponse } from "next/server";

import Task from "@/models/Task";


export async function POST(req: NextRequest) {
    try {


        await connectDb()
        const body = await req.json()
        const { title, description, priority, status, dueDate, assignedTo, createdBy, attachments, todoCheckList, progress } = body


        if (!title || !dueDate) {
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

        return NextResponse.json({
            message: "Task added successfully", task: {
                id: newTask._id,
                title: newTask.title,
                description: newTask.description,
                priority: newTask.priority,
                status: newTask.status,
                dueDate: newTask.dueDate,
                assignedTo: newTask.assignedTo,
                createdBy: newTask.createdBy,
                attachments: newTask.attachments,
                todoCheckList: newTask.todoCheckList,
                progress: newTask.progress
            }
        })


    } catch (error) {
        console.log('error in creating task', error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });


    }
}