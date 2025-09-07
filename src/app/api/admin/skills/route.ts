import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SkillsSchema } from "@/lib/portfolioSchema";

export async function POST(req: Request) {
    const body = await req.json();
    const parsed = SkillsSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    const result = await db.collection("Skills").insertOne({ ...parsed.data, createdAt: new Date() });
    return NextResponse.json({ message: "Skill added", id: result.insertedId });
}

export async function PUT(req: Request) {
    const { _id, ...rest } = await req.json();
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    await db.collection("Skills").updateOne({ _id }, { $set: { ...rest, updatedAt: new Date() } });
    return NextResponse.json({ message: "Skill updated" });
}

export async function DELETE(req: Request) {
    const { _id } = await req.json();
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    await db.collection("Skills").deleteOne({ _id });
    return NextResponse.json({ message: "Skill deleted" });
}


