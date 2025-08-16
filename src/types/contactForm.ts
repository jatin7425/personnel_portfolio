import { z } from "zod";
import { contactFormSchema } from '@/lib/portfolioSchema'

export type ContactFormType = z.infer<typeof contactFormSchema>;
