import { statsType } from "@/types/quickstats";

export async function fetchStats(): Promise<statsType[]> {
    const res = await fetch("/api/quickstats");
    if (!res.ok) throw new Error("Failed to fetch quickstats");
    return await res.json();
}