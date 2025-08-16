import { CertificationType } from "@/types/certification";

export async function fetchCertifications(): Promise<CertificationType[]> {
  const res = await fetch("/api/certifications");
  if (!res.ok) throw new Error("Failed to fetch certifications");
  return await res.json();
}

export async function createCertification(data: CertificationType): Promise<CertificationType> {
  const res = await fetch("/api/jatin7525/certifications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to create certification");
  return result;
}

export async function updateCertification(id: string, data: Partial<CertificationType>): Promise<CertificationType> {
  const res = await fetch("/api/jatin7525/certifications", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...data }),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to update certification");
  return result;
}

export async function deleteCertification(id: string): Promise<{ message: string }> {
  const res = await fetch("/api/jatin7525/certifications", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to delete certification");
  return result;
}
