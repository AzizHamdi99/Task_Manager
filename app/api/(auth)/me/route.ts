// app/api/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "@/libs/db";
import User from "@/models/User";

export async function GET(req: NextRequest) {
    await connectDb();

    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findById(decoded.userId).select("-password");

        return NextResponse.json({ user });
    } catch (err) {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
}
