import Task from "@/models/Task";
import User from "@/models/User";
import { NextResponse } from "next/server";




export async function GET() {
    try {

        const users = await User.find({ role: "User" })

        for (user of users) {
            const tasks = await Task.find({ assignedTo: { $in: [user._id] } });
            const statusCounts = {
                pending: 0,
                inProgress: 0,
                completed: 0
            }
            tasks.forEach((task) => {
                if (task.status === "Pending") statusCounts.pending++;
                else if (task.status === "In Progrees") statusCounts.inProgress++;
                else if (task.status === "Completed") statusCounts.completed++;
            })


        })


    } catch (error) {
        console.error("Error fetching users list:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

}