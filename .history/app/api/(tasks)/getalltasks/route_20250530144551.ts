import { connectDb } from "@/libs/db"
import Task from "@/models/Task"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
    try {
        await connectDb()
        const tasks = await Task.find({})


        const statusCount = {
            pending: 0,
            inProgress: 0,
            completed: 0
        }


        const priorityCount = {
            low: 0,
            meduim: 0,
            high: 0
        }

        tasks.forEach((t) => {
            if (t.status === "Pending")
        })


        return NextResponse.json({ tasks })

    } catch (error) {
        console.log('error in fetching tasks', error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });


    }

}