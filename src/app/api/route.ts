import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(_request: Request) {
  const stats = [
    { title: 'Projects Completed', value: 10 },
    { title: 'Data Points Scraped', value: 100 },
    { title: 'Age', value: 100 },
  ];

  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db;

  const data = await db.collection("Experience").find().toArray();

  // Month map for "Jan", "Feb", etc.
  const monthMap: Record<string, number> = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  let earliestDate: Date | null = null;

  for (const exp of data) {
    const from = exp?.timeline?.from; // e.g. "Jan 2025"
    if (!from) continue;

    const [monthStr, yearStr] = from.split(" ");
    const month = monthMap[monthStr];
    const year = parseInt(yearStr);

    if (!month || !year) continue;

    const expDate = new Date(year, month - 1); // month - 1 because JS is 0-based
    if (!earliestDate || expDate < earliestDate) {
      earliestDate = expDate;
    }
  }

  if (earliestDate) {
    const today = new Date();
    const totalMonths =
      (today.getFullYear() - earliestDate.getFullYear()) * 12 +
      (today.getMonth() - earliestDate.getMonth());

    const totalExperienceYears = (totalMonths / 12).toFixed(1); // 1 decimal place
    stats.push({ title: 'Years Experience', value: Number(totalExperienceYears) });
  }

  return NextResponse.json(stats);
}
