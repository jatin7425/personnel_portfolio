import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        const skills = await db.collection("Skills").find({}).toArray();
        return NextResponse.json({ skills }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
    }
}


