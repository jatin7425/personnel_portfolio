import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { z } from "zod";

// Zod schema for validation
const UiConfigSchema = z.object({
    renderAboutSection: z.boolean(),
    renderSkillsSection: z.boolean(),
    renderProjectsSection: z.boolean(),
    renderTechStackVisualization: z.boolean(),
    // Add other UI configuration fields as needed
});

export async function GET() {
    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        const UI_Config = await db.collection("UI_Config").find({}).toArray();
        return NextResponse.json({ UI_Config }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch UI_Config" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = UiConfigSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json({ error: validatedData.error.issues }, { status: 400 });
        }
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;

        const result = await db.collection("UI_Config").insertOne(validatedData.data);
        return NextResponse.json({ message: "UI_Config created", id: result.insertedId }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch UI_Config" }, { status: 500 });
    }
}
