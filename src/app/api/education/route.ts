import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
    // connectToDatabase returns a Mongoose instance
    const mongoose = await connectToDatabase();
    // Access the native Db object from the Mongoose connection
    const db = mongoose.connection.db;

    const data = await db.collection("Education").find({}).toArray();
    return NextResponse.json(data);
}