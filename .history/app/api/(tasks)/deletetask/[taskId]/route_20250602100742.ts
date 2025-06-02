import { connectDb } from "@/libs/db";
import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: { taskId: string };
}

export async function POST(
    req: NextRequest,
    { params }: Params
) {
    try {
        await connectDb();

        const taskid = params.taskId.trim();

        if (!taskid) {
            return NextResponse.json({ message: "Missing tasId" }, { status: 400 });
        }


        const task = await Task.findOneAndDelete({ _id: taskid })





        return NextResponse.json({
            mesaage: "task deleted successfully"

        });

    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
