import { z } from "zod";

export const PrivateContentCard = z.object({
  id: z.string().min(1),
  imageUrl: z.string().min(1),
  videoUrl: z.string().min(1),

  // set internally
  internalImagePath: z.string().optional(),
  internalVideoPath: z.string().optional(),
});

export const PrivateContent = z.object({
  data: PrivateContentCard.array(),
});

export type PrivateContentCard = z.infer<typeof PrivateContentCard>;
export type PrivateContent = z.infer<typeof PrivateContent>;
