import { connectDb } from "@/libs/db";
import { NextRequest } from "next/server";




export async function PUT(req: NextRequest) {

    await connectDb()

    const { taskId, index, state } = req.body




}