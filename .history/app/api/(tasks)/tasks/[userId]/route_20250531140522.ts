import { connectDb } from "@/libs/db";
import Task from "@/models/Task";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: { userId: string };
}

export async function GET(
    req: NextRequest,
    { params }: Params
) {
    try {
        await connectDb();

        const userId = params.userId.trim();

        if (!userId) {
            return NextResponse.json({ message: "Missing userId" }, { status: 400 });
        }
        const user = await User.find({ _id: userId })
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 400 });

        }
        console.log(user)
        if (user?.role == "ADMIN") {
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
            return NextResponse.json({
                tasks,
                counts: {
                    status: statusCount,
                    priority: priorityCount,

                },
            });

        }
        else {
            const tasks = await Task.find({ assignedTo: { $in: [userId] } });


            const statusCounts = { pending: 0, inProgress: 0, completed: 0 };
            const priorityCounts = { low: 0, meduim: 0, high: 0 };


            tasks.forEach((task) => {
                if (task.status === "Pending") statusCounts.pending++;
                else if (task.status === "In Progrees") statusCounts.inProgress++;
                else if (task.status === "Completed") statusCounts.completed++;

                if (task.priority === "Low") priorityCounts.low++;
                else if (task.priority === "Meduim") priorityCounts.meduim++;
                else if (task.priority === "High") priorityCounts.high++;


            });
            return NextResponse.json({
                tasks,
                counts: {
                    status: statusCounts,
                    priority: priorityCounts,

                },
            });


        }






    } catch (error) {
        console.error("Error fetching tasks for user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
