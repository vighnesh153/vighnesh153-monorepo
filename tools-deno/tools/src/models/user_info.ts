import { z } from "zod";

export const GoogleOAuthUserInfo = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  picture: z.string().min(1),
  email_verified: z.boolean(),
});

export type GoogleOAuthUserInfo = z.infer<typeof GoogleOAuthUserInfo>;

export const PublicUserInfo = z.object({
  userId: z.string().min(1),
  name: z.string().min(1),
  profilePictureUrl: z.string().min(1),
  createdAtMillis: z.number(),
});

export type PublicUserInfo = z.infer<typeof PublicUserInfo>;

export const CompleteUserInfo = PublicUserInfo.extend({
  email: z.string().email(),
});

export type CompleteUserInfo = z.infer<typeof CompleteUserInfo>;

export function convertToPublicUserInfo(
  completeUserInfo: CompleteUserInfo,
): PublicUserInfo {
  const publicUserInfo = { ...completeUserInfo };
  // @ts-ignore: typescript is stupid
  delete publicUserInfo["email"];
  return publicUserInfo;
}
