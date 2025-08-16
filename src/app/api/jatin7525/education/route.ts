import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { EducationSchema } from "@/lib/portfolioSchema";

export async function POST(req: Request) {
    const body = await req.json();
    const parsed = EducationSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }
    // connectToDatabase returns a Mongoose instance
    const mongoose = await connectToDatabase();
    // Access the native Db object from the Mongoose connection
    const db = mongoose.connection.db;

    const result = await db.collection("Education").insertOne({ ...parsed.data, createdAt: new Date() });
    return NextResponse.json({ message: "Education added", id: result.insertedId });
}

export async function PUT(req: Request) {
    const { id, ...rest } = await req.json();
    const parsed = EducationSchema.partial().safeParse(rest);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }
    // connectToDatabase returns a Mongoose instance
    const mongoose = await connectToDatabase();
    // Access the native Db object from the Mongoose connection
    const db = mongoose.connection.db;

    await db.collection("Education").updateOne(
        { _id: id },
        { $set: { ...parsed.data, updatedAt: new Date() } }
    );
    return NextResponse.json({ message: "Education updated" });
}

export async function DELETE(req: Request) {
    const { id } = await req.json();
    // connectToDatabase returns a Mongoose instance
    const mongoose = await connectToDatabase();
    // Access the native Db object from the Mongoose connection
    const db = mongoose.connection.db;

    await db.collection("Education").deleteOne({ _id: id });
    return NextResponse.json({ message: "Education deleted" });
}
