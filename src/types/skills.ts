export type SkillItem = {
    _id?: string;
    stack: string; // e.g., Frontend, Backend, Database, Scraping, Tools
    tech: string;  // e.g., React, TypeScript
    Proficiency: string; // e.g., 95%
    icon?: string; // optional icon key
    createdAt?: Date;
};

export type SkillsByCategory = Record<string, SkillItem[]>;


