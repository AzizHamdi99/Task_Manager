import { connectDb } from "@/libs/db";
import { NextRequest } from "next/server";




export async function PUT(req: NextRequest, { params }: { params: string }) {

    await connectDb()




}