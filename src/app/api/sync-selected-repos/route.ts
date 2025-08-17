import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { repos } = await req.json();
    if (!repos || !repos.length) {
      return NextResponse.json({ error: "No repos selected" }, { status: 400 });
    }

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    const collection = db.collection("Projects");

    const ops = repos.map((repo: any) =>
      collection.updateOne(
        // Filter by repoId for upsert logic
        { repoId: repo.id },
        {
          $set: {
            title: repo.name,
            description: repo.description,
            repoLink: repo.html_url,
            updatedAt: new Date(),
          },
          // Set these fields only on insert
          $setOnInsert: {
            repoId: repo.id,
            category: "", // Placeholder for category
            tech_used: [], // Placeholder for tech_used
            thumbnail: "", // Placeholder for thumbnail
            visitLink: "", // Placeholder for visitLink
            stats: {}, // Placeholder for stats
            createdAt: new Date(),
          },
        },
        { upsert: true }
      )
    );

    const result = await Promise.all(ops);

    return NextResponse.json({
      message: "Selected repos synced",
      count: repos.length,
      result,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to sync repos" },
      { status: 500 }
    );
  }
}