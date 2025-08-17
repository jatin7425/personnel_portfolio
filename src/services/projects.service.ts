import { ProjectType } from "@/types/project"; // You would define this type based on your schema

// --- Read (Get All) ---
export const fetchAllProjects = async (): Promise<ProjectType[] | null> => {
    try {
        const res = await fetch("/api/projects");
        if (!res.ok) {
            throw new Error("Failed to fetch projects");
        }
        const data = await res.json();
        return data.projects;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return null;
    }
};

// --- Read (Get by ID) ---
export const fetchProjectById = async (id: string): Promise<ProjectType | null> => {
    try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch project with ID: ${id}`);
        }
        const data = await res.json();
        return data.project;
    } catch (error) {
        console.error("Error fetching project:", error);
        return null;
    }
};

// --- Update (Put) ---
export const updateProject = async (
    id: string,
    updatedProjectData: Partial<ProjectType>
): Promise<any> => {
    try {
        const res = await fetch(`/api/projects/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProjectData),
        });
        if (!res.ok) {
            throw new Error(`Failed to update project with ID: ${id}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error updating project:", error);
        return null;
    }
};

// --- Delete ---
export const deleteProject = async (id: string): Promise<any> => {
    try {
        const res = await fetch(`/api/projects/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error(`Failed to delete project with ID: ${id}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error deleting project:", error);
        return null;
    }
};