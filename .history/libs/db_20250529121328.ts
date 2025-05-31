import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDb() {
    if (cached.conn) return cached.conn

}