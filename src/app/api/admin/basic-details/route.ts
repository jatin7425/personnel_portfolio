import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { basicDetailsSchema } from "@/lib/portfolioSchema";
import { ObjectId } from "mongodb";
import { withApiHandler } from "@/lib/apiHandler";

// Create new basic detail
export const POST = withApiHandler(async (req) => {
    const body = await req.json();
    const parsed = basicDetailsSchema.parse(body);

    const mongoose = await connectToDatabase();
    // Access the native Db object from the Mongoose connection
    const db = mongoose.connection.db;
    
    const result = await db.collection("BasicDetails").insertOne({
        ...parsed,
        createdAt: new Date(),
    });

    return NextResponse.json({ message: "Data saved", id: result.insertedId });
});

// Update existing basic detail
export const PUT = withApiHandler(async (req) => {
    const { _id, ...rest } = await req.json();
    const parsed = basicDetailsSchema.partial().parse(rest);

    const mongoose = await connectToDatabase();
    // Access the native Db object from the Mongoose connection
    const db = mongoose.connection.db;
    
    await db.collection("BasicDetails").updateOne(
        { _id: new ObjectId(_id) },
        { $set: { ...parsed, updatedAt: new Date() } }
    );

    return NextResponse.json({ message: "Data updated" });
});
