import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().max(20),
  description: z.string().max(100),
  content: z.string(),
});