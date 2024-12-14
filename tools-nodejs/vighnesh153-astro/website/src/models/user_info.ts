import { z } from "zod";

export const UserInfo = z.object({
  userId: z.string().min(1),
  name: z.string().min(1),
  username: z.string().min(1),
  profilePictureUrl: z.string().min(1),
  createdAtMillis: z.number(),
});

export type UserInfo = z.infer<typeof UserInfo>;
