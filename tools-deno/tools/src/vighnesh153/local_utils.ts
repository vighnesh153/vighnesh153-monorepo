import type { z } from "zod";

export type IsValidZodObjectReturnValue = { success: true } | {
  success: false;
  errors: string[];
};

export function isValidZodObject(
  value: unknown,
  zodSchema: z.ZodTypeAny,
): IsValidZodObjectReturnValue {
  const res = zodSchema.safeParse(value);
  if (res.success) {
    return { success: true };
  }
  return { success: false, errors: res.error.errors.map((e) => e.message) };
}
