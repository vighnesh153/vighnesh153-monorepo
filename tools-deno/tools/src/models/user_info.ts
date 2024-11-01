import { z } from "zod";

import { assertType, type Equals } from "@/utils/type_assertion.ts";
import {
  isValidZodObject,
  type IsValidZodObjectReturnValue,
} from "@/vighnesh153/local_utils.ts";

const ZodGoogleOAuthUserInfo = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  picture: z.string().min(1),
  email_verified: z.boolean(),
});

const ZodPublicUserInfo = z.object({
  userId: z.string().min(1),
  name: z.string().min(1),
  profilePictureUrl: z.string().min(1),
  createdAtMillis: z.number(),
});

const ZodCompleteUserInfo = ZodPublicUserInfo.extend({
  email: z.string().email(),
});

export type GoogleOAuthUserInfo = {
  name: string;
  email: string;
  picture: string;
  email_verified: boolean;
};

export type PublicUserInfo = {
  userId: string;
  name: string;
  profilePictureUrl: string;
  createdAtMillis: number;
};

export type CompleteUserInfo = {
  userId: string;
  name: string;
  profilePictureUrl: string;
  createdAtMillis: number;
  email: string;
};

assertType<
  Equals<GoogleOAuthUserInfo, z.infer<typeof ZodGoogleOAuthUserInfo>>
>;

assertType<Equals<PublicUserInfo, z.infer<typeof ZodPublicUserInfo>>>;

assertType<Equals<CompleteUserInfo, z.infer<typeof ZodCompleteUserInfo>>>;

export function isValidGoogleOAuthUserInfo(
  value: unknown,
): IsValidZodObjectReturnValue {
  return isValidZodObject(value, ZodGoogleOAuthUserInfo);
}

export function isValidPublicUserInfo(
  value: unknown,
): IsValidZodObjectReturnValue {
  return isValidZodObject(value, ZodPublicUserInfo);
}

export function isValidCompleteUserInfo(
  value: unknown,
): IsValidZodObjectReturnValue {
  return isValidZodObject(value, ZodCompleteUserInfo);
}

export function convertToPublicUserInfo(
  completeUserInfo: CompleteUserInfo,
): PublicUserInfo {
  const publicUserInfo = { ...completeUserInfo };
  // @ts-ignore: typescript is stupid
  delete publicUserInfo["email"];
  return publicUserInfo;
}
