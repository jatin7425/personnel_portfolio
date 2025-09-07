import { SkillItem } from "@/types/skills";

export async function fetchSkills(): Promise<SkillItem[]> {
    const res = await fetch("/api/skills");
    if (!res.ok) throw new Error("Failed to fetch skills");
    const data = await res.json();
    return data.skills ?? [];
}

export async function createSkill(input: Omit<SkillItem, "_id">): Promise<void> {
    const res = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("Failed to create skill");
}

export async function updateSkill(input: SkillItem): Promise<void> {
    const res = await fetch("/api/admin/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("Failed to update skill");
}

export async function deleteSkill(_id: string): Promise<void> {
    const res = await fetch("/api/admin/skills", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
    });
    if (!res.ok) throw new Error("Failed to delete skill");
}


