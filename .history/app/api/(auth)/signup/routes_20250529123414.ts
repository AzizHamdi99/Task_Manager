import { connectDb } from "@/libs/db";

export async function POST(req: any, res: any) {
    await connectDb()
    const { fullname, email, password, pic } = req.body


}