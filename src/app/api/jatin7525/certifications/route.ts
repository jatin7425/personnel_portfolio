import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { CertificationSchema } from "@/lib/portfolioSchema";

export async function POST(req: Request) {
    const body = await req.json();
    const parsed = CertificationSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }
    // connectToDatabase returns a Mongoose instance
    const mongoose = await connectToDatabase();
    // Access the native Db object from the Mongoose connection
    const db = mongoose.connection.db;

    const result = await db.collection("Certifications").insertOne({ ...parsed.data, createdAt: new Date() });
    return NextResponse.json({ message: "Certification added", id: result.insertedId });
}

export async function PUT(req: Request) {
    const { id, ...rest } = await req.json();
    const parsed = CertificationSchema.partial().safeParse(rest);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }
    // connectToDatabase returns a Mongoose instance
    const mongoose = await connectToDatabase();
    // Access the native Db object from the Mongoose connection
    const db = mongoose.connection.db;

    await db.collection("Certifications").updateOne(
        { _id: id },
        { $set: { ...parsed.data, updatedAt: new Date() } }
    );
    return NextResponse.json({ message: "Certification updated" });
}

export async function DELETE(req: Request) {
    const { id } = await req.json();
    // connectToDatabase returns a Mongoose instance
    const mongoose = await connectToDatabase();
    // Access the native Db object from the Mongoose connection
    const db = mongoose.connection.db;

    await db.collection("Certifications").deleteOne({ _id: id });
    return NextResponse.json({ message: "Certification deleted" });
}
