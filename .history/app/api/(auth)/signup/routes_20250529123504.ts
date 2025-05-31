import { connectDb } from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    await connectDb()
    const { fullname, email, password, pic } = req.body


}