import { connectDb } from "@/libs/db";
import Task from "@/models/Task";
import User from "@/models/User";
import { NextResponse } from "next/server";




export async function GET() {
    try {
        await connectDb()

        const users = await User.find({ role: "USER" })
        const userStats = []
        for (const user of users) {
            const tasks = await Task.find({ assignedTo: { $in: [user._id] } });
            const statusCounts = {
                pending: 0,
                inProgress: 0,
                completed: 0
            }
            tasks.forEach((task) => {
                if (task.status === "Pending") statusCounts.pending++;
                else if (task.status === "In Progress") statusCounts.inProgress++;
                else if (task.status === "Completed") statusCounts.completed++;
            })

            userStats.push({
                userId: user._id,
                name: user.fullname,
                email: user.email,
                pic: user.pic,
                taskCounts: statusCounts

            })


        }

        return NextResponse.json(userStats)


    } catch (error) {
        console.error("Error fetching users list:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

}