import { EducationType } from "@/types/education";

export async function fetchEducation(): Promise<EducationType[]> {
  const res = await fetch("/api/education");
  if (!res.ok) throw new Error("Failed to fetch education");
  return await res.json();
}

export async function createEducation(data: EducationType): Promise<EducationType> {
  const res = await fetch("/api/jatin7525/education", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to create education");
  return result;
}

export async function updateEducation(id: string, data: Partial<EducationType>): Promise<EducationType> {
  const res = await fetch("/api/jatin7525/education", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...data }),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to update education");
  return result;
}

export async function deleteEducation(id: string): Promise<{ message: string }> {
  const res = await fetch("/api/jatin7525/education", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to delete education");
  return result;
}
