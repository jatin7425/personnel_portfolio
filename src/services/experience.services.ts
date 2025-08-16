import { ExperienceType } from "@/types/experience";


// src/services/basicDetails.service.ts
export const fetchExperience = async (): Promise<ExperienceType | null> => {
    try {
        const res = await fetch("/api/experience");
        if (!res.ok) {
            throw new Error("Failed to fetch basic details");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching basic details:", error);
        return null;
    }
};

export const createExperience = async (
    details: ExperienceType
): Promise<any> => {
    try {
        const res = await fetch("/api/jatin7525/experience", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
        });
        if (!res.ok) {
            throw new Error("Failed to update basic details");
        }
        return await res.json();
    } catch (error) {
        console.error("Error updating basic details:", error);
        return null;
    }
};

export const updateExperience = async (
    details: ExperienceType
): Promise<any> => {
    try {
        const res = await fetch("/api/jatin7525/experience", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
        });
        if (!res.ok) {
            throw new Error("Failed to update basic details");
        }
        return await res.json();
    } catch (error) {
        console.error("Error updating basic details:", error);
        return null;
    }
};