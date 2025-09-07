import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

// Zod schema for validation
const ProjectUpdateSchema = z.object({
    title: z.string().min(1, "Title is required.").optional(),
    description: z.string().optional(),
    category: z.string().min(1, "Category is required.").optional(),
    tech_used: z.array(z.string()).optional(),
    thumbnail: z.string().url("Invalid thumbnail URL.").optional(),
    visitLink: z.string().url("Invalid visit link URL.").optional(),
    repoLink: z.string().url("Invalid repository link URL.").optional(),
    render: z.boolean().optional(),
    stats: z.object({}).optional(),
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
        }

        const body = await req.json();
        const validatedData = ProjectUpdateSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json({ error: validatedData.error.issues }, { status: 400 });
        }

        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        const collection = db.collection("Projects");

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...validatedData.data, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Project updated successfully" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
        }

        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        const collection = db.collection("Projects");

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
        }

        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        const collection = db.collection("Projects");

        const project = await collection.findOne({ _id: new ObjectId(id) });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ project }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
}