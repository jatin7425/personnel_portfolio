import { z } from "zod";
import { ProjectSchema } from '@/lib/portfolioSchema'

export type ProjectType = z.infer<typeof ProjectSchema>;
