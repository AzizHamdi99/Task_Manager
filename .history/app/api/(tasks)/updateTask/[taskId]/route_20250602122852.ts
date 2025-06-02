import { connectDb } from "@/libs/db";
import { NextRequest } from "next/server";



export async function PUT(req: NextRequest, { params }: { params: { taskId: string } }) {

    await connectDb()

    const taskId = params.taskId
    const data = req.json()

}