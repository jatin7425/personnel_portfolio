import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

// Count files in src/components (recursively)
function countComponentFiles(dir: string): number {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      count += countComponentFiles(full);
    } else if (ent.isFile()) {
      // count only tsx/jsx/js/tsx files
      if (/\.(tsx|jsx|ts|js)$/.test(ent.name)) count++;
    }
  }
  return count;
}

export async function POST() {
  try {
    const componentsDir = path.resolve(process.cwd(), 'src', 'components');
    if (!fs.existsSync(componentsDir)) {
      return NextResponse.json({ error: 'components directory not found' }, { status: 404 });
    }

    const count = countComponentFiles(componentsDir);

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    // Upsert into SystemStats collection
    await db.collection('SystemStats').updateOne(
      { key: 'components_count' },
      { $set: { key: 'components_count', value: count, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ components: count }, { status: 200 });
  } catch (err) {
    console.error('refresh-components error', err);
    return NextResponse.json({ error: 'Failed to refresh components count' }, { status: 500 });
  }
}
