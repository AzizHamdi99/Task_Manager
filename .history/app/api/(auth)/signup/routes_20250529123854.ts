import { connectDb } from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    await connectDb()
    const body = await req.json()

    const { fullname, email, password, code, pic } = body.json
    if (!fullname || !email || !password) {

    }


}