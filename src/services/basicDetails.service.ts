import { ProfileDetails } from "@/types/basicDetails";

// src/services/basicDetails.service.ts
export const fetchBasicDetails = async (): Promise<ProfileDetails> => {
    try {
        const res = await fetch("/api/basic-details");
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

export const updateBasicDetails = async (
    details: ProfileDetails
): Promise<any> => {
    try {
        const res = await fetch("/api/jatin7525/basic-details", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
        });
        if (!res.ok) {
            throw new Error("Failed to update basic details");
        }
        console.log(res.json())
        return await res.json();
    } catch (error) {
        console.error("Error updating basic details:", error);
        return null;
    }
};