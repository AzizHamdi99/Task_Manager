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
            if (t.status === "Pending") statusCount.pending++
            else if (t.status === "In Progress") statusCount.inProgress++
            else if (t.status === "Completed") statusCount.completed++

            if (t.priority === "Low") priorityCount.low++
            else if (t.priority === "Meduim") priorityCount.meduim++
            else if (t.priority === "High") priorityCount.high++


        })


        return NextResponse.json({ tasks, })

    } catch (error) {
        console.log('error in fetching tasks', error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });


    }

}