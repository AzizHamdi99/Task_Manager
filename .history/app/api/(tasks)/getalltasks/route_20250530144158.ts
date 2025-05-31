import { connectDb } from "@/libs/db"
import Task from "@/models/Task"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
    try {
        await connectDb()
        const tasks = await Task.find({})
        tasks.todoCheckList.map((t) => {
            const

        })
        return NextResponse.json({ tasks })

    } catch (error) {
        console.log('error in fetching tasks', error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });


    }

}