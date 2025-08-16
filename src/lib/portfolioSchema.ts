// lib/portfolioSchema.ts
import { link } from "node:fs";
import { z } from "zod";

const TimelineSchema = z.object({
    from: z.string(), // "month-year" or "year"
    to: z.string(),   // "month-year" | "present" | "year"
});

const DynamicIconMapSchema = z.record(
    z.string(),
    z.object({
        value: z.string(),
        iconSvg: z.string(),
        createdAt: z.date().optional(),
    })
);

export const socialSchema = z.object({
    name: z.string(),
    link: z.string(),
    createdAt: z.date().optional(),
});

export const basicDetailsSchema = z.object({
    _id: z.string().optional(), // Optional for new entries
    FullName: z.string(),
    DateOfBirth: z.string(), // store as YYYY-MM-DD
    TechField: z.array(z.string()),
    ProfilePic: z.string(),
    ShortDescription: z.string(),
    Social: z.array(socialSchema),
    Email: z.string().email(),
    Phone: z.string(),
    Location: z.string(),
    Availability: z.string(),
    createdAt: z.date().optional(),
});

// 2. Experience
export const ExperienceSchema = z.object({
    Post: z.string(),
    Company: z.string(),
    timeline: TimelineSchema,
    description: z.string(),
    createdAt: z.date().optional(),
});

// 3. Education
export const EducationSchema = z.object({
    course: z.string(),
    organisation: z.string(),
    timeline: TimelineSchema,
    description: z.string(),
    createdAt: z.date().optional(),
});

// 4. Certifications
export const CertificationSchema = z.object({
    Certificate: z.string(),
    from: z.string(),
    year: z.string(),
    createdAt: z.date().optional(),
});

// 5. Skills
export const SkillsSchema = z.object({
    stack: z.string(),
    tech: z.string(),
    Proficiency: z.string(), // e.g., "Beginner", "Intermediate", "Expert"
    createdAt: z.date().optional(),
});

// 6. Projects
export const ProjectSchema = z.object({
    title: z.string(),
    category: z.string(),
    tech_used: z.array(z.string()),
    ShortDescription: z.string(),
    Thumbnail: z.string().url(),
    VisitLink: z.string().url(),
    GithubLink: z.string().url(),
    stats: DynamicIconMapSchema, // dynamic project stats
    createdAt: z.date().optional(),
});

export const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(3, "Subject must be at least 3 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    createdAt: z.date().optional(),
});
