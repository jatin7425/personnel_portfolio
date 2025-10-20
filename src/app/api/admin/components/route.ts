import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

function scanComponents(dir: string, base = dir) {
  const items: { key: string; name: string; path: string }[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      items.push(...scanComponents(full, base));
    } else if (ent.isFile()) {
      if (/\.(tsx|jsx|ts|js)$/.test(ent.name)) {
        const rel = path.relative(base, full).replaceAll(path.sep, '/');
        const name = path.basename(ent.name, path.extname(ent.name));
        const key = rel; // use relative path as key to avoid collisions
        items.push({ key, name, path: rel });
      }
    }
  }
  return items;
}

export async function GET() {
  try {
    const componentsDir = path.resolve(process.cwd(), 'src', 'components');
    if (!fs.existsSync(componentsDir)) {
      return NextResponse.json({ error: 'components directory not found' }, { status: 404 });
    }

    const scanned = scanComponents(componentsDir);

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    const toggles = await db
      .collection('ComponentToggles')
      .find({})
      .toArray();

    const toggleMap: Record<string, boolean> = {};
    toggles.forEach((t: any) => {
      if (t.key) toggleMap[t.key] = !!t.enabled;
    });

    const results = scanned.map((c) => ({ key: c.key, name: c.name, enabled: toggleMap[c.key] ?? true }));

    return NextResponse.json({ components: results }, { status: 200 });
  } catch (err) {
    console.error('admin/components GET error', err);
    return NextResponse.json({ error: 'Failed to list components' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, enabled } = body;
    if (typeof key !== 'string' || typeof enabled !== 'boolean') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    await db.collection('ComponentToggles').updateOne({ key }, { $set: { key, enabled, updatedAt: new Date() } }, { upsert: true });

    return NextResponse.json({ message: 'updated', key, enabled }, { status: 200 });
  } catch (err) {
    console.error('admin/components POST error', err);
    return NextResponse.json({ error: 'Failed to update toggle' }, { status: 500 });
  }
}
