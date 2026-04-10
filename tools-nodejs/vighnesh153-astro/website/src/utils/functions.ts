import { httpsCallable } from "firebase/functions";

import { getOrCreateFirebaseFunctions } from "./firebase_config";

export async function invokeFirebaseFunction(
  functionName: string,
  data: unknown = undefined,
): Promise<unknown> {
  const fn = httpsCallable(await getOrCreateFirebaseFunctions(), functionName);
  return data === undefined ? fn() : fn(data);
}
