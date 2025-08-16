import { z } from "zod";
import { basicDetailsSchema, socialSchema } from '@/lib/portfolioSchema'

export type ProfileDetails = z.infer<typeof basicDetailsSchema>;
export type SocialItem = z.infer<typeof socialSchema>;