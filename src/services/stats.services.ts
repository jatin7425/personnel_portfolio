import { statsType } from "@/types/quickstats";

export async function fetchStats(): Promise<statsType[]> {
    const res = await fetch("/api/quickstats");
    if (!res.ok) throw new Error("Failed to fetch quickstats");
    return await res.json();
}

export async function fetchSkills(): Promise<any[]> {
    try {
        const res = await fetch("/api/skills");
        if (!res.ok) throw new Error("Failed to fetch skills");
        const data = await res.json();
        return data.skills ?? [];
    } catch (error) {
        console.error("Error fetching skills:", error);
        return [];
    }
}