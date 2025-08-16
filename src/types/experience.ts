import { z } from "zod";
import { ExperienceSchema, EducationSchema } from '@/lib/portfolioSchema'

export type ExperienceType = z.infer<typeof ExperienceSchema>;
export type EducationType = z.infer<typeof EducationSchema>;
