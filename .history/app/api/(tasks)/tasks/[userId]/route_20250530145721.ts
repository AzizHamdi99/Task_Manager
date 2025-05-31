import { connectDb } from "@/libs/db";
import { url } from "inspector";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        await connectDb()

        const { searchParams } = new URL(req.url)

    } catch (error) {
        console.log('error in get users task', error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

}