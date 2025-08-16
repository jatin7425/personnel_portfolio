import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    const data = await db.collection("Experience").find().toArray();

    // month map
    const monthMap: Record<string, number> = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };

    let earliestDate: Date | null = null;

    for (let exp of data) {
        let from = exp?.timeline?.from; // e.g. "Jan 2025"
        if (!from) continue;

        let [monthStr, yearStr] = from.split(" ");
        let month = monthMap[monthStr];
        let year = parseInt(yearStr);

        if (isNaN(year) || month === undefined) continue;

        let expDate = new Date(year, month);
        if (!earliestDate || expDate < earliestDate) {
            earliestDate = expDate;
        }
    }

    let value = 0;
    let label = "Years Experience";

    if (earliestDate) {
        const today = new Date();
        const totalMonths =
            (today.getFullYear() - earliestDate.getFullYear()) * 12 +
            (today.getMonth() - earliestDate.getMonth());

        if (totalMonths < 12) {
            // less than a year → show months
            value = totalMonths <= 0 ? 1 : totalMonths; // at least 1 month
            label = "Months Experience";
        } else {
            // 1 year or more → show years
            value = Math.floor(totalMonths / 12);
            label = "Years Experience";
        }
    }

    const stats = [{ title: label, value: value }];

    return NextResponse.json(stats);
}
