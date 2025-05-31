import { connectDb } from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    await connectDb()
    const body =

    if (!fullname || !email || !password) {

    }


}