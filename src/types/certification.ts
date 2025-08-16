import { z } from "zod";
import { CertificationSchema } from '@/lib/portfolioSchema'

export type CertificationType = z.infer<typeof CertificationSchema>;
