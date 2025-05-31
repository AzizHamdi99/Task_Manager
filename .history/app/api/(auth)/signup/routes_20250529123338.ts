import { connectDb } from "@/libs/db";

export async function POST(req: any, res: any) {
    await connectDb()
    const { name }

}