import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { withApiHandler } from "@/lib/apiHandler";

export const GET = withApiHandler(async () => {
    // connectToDatabase returns a Mongoose instance
    const mongoose = await connectToDatabase();
    // Access the native Db object from the Mongoose connection
    const db = mongoose.connection.db;

    const data = await db.collection("Experience").find().toArray();

    if (!data) {
        return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    return NextResponse.json(data);
});