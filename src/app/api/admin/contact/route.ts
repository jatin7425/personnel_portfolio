import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { withApiHandler } from "@/lib/apiHandler";

export const GET = withApiHandler(async () => {
    const mongoose = await connectToDatabase();
    // Access the native Db object from the Mongoose connection
    const db = mongoose.connection.db;

    const collection = db.collection("ContactForms");

    const messages = await collection
        .find({})
        .sort({ createdAt: -1 }) // latest first
        .toArray();

    return NextResponse.json(messages);
});
