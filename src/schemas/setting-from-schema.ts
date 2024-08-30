import z from "zod";

export const settingsSchema = z.object({
  image: z.string().url("Image must be a valid URL"),
  name: z.string().max(40, "Name is too Long"),
  bio: z.string(),
});
