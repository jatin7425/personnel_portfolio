import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { contactFormSchema } from "@/lib/portfolioSchema";
import { withApiHandler } from "@/lib/apiHandler";

export const POST = withApiHandler(async (request) => {
    const body = await request.json();

    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const mongoose = await connectToDatabase();
    // Access the native Db object from the Mongoose connection
    const db = mongoose.connection.db;
    
    const collection = db.collection("ContactForms");

    const result = await collection.insertOne({
        ...parsed.data,
        createdAt: new Date(),
    });

    return NextResponse.json({
        message: "Form submitted successfully!",
        id: result.insertedId,
    });
});
