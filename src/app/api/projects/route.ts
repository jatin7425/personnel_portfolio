import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req: Request) {
    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        const collection = db.collection("Projects");

        const projects = await collection.find({}).toArray();

        return NextResponse.json({ projects }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}