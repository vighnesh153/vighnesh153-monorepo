import { z } from "zod";

export const PrivateContent = z.object({
  data: z.object({
    internalImagePath: z.string().min(1),
    internalVideoPath: z.string().min(1),
    imageUrl: z.string().min(1),
    videoUrl: z.string().min(1),
  }).array(),
});

export type PrivateContent = z.infer<typeof PrivateContent>;
