import ls from "localstorage-slim";
import { milliseconds, not } from "@vighnesh153/tools";

import { invokeFirebaseFunction } from "@/utils/firebase_config";

import { PrivateContent } from "@/models/private_content";
import { hasPermission } from "../../../permissions/mod.ts";

const cacheKeys = {
  privateContent: "vighnesh153/private_content",
};

export async function getPrivateContent(
  userId: string | null,
): Promise<PrivateContent | null> {
  if (userId === null) {
    console.log("User is not authenticated to get private content");
    return null;
  }

  if (not(hasPermission(userId, "getPrivateContent"))) {
    console.log("User is not authorized to get private content");
    return null;
  }

  const maybePrivateContent = ls.get(cacheKeys.privateContent);
  const parsedPrivateContent = parsePrivateContent(maybePrivateContent);
  if (parsedPrivateContent !== null) {
    console.log("Fetched private content from local cache");
    return parsedPrivateContent;
  }

  const privateContentFromFirebase = await getPrivateContentFromFirebase();
  if (privateContentFromFirebase === null) {
    return null;
  }

  // Cache private content for 1 day
  ls.set(cacheKeys.privateContent, privateContentFromFirebase, {
    ttl: milliseconds({ days: 1 }) / 1000,
  });
  return privateContentFromFirebase;
}

async function getPrivateContentFromFirebase(): Promise<PrivateContent | null> {
  console.log("Fetching private content from firebase");
  const privateContentFromFirebase = await (async () => {
    try {
      await invokeFirebaseFunction(
        "getPrivateContent",
      );
    } catch (e) {
      console.error(
        "Failed to get private content from firebase functions.",
        e,
      );
      return null;
    }
  })();
  if (privateContentFromFirebase == null) {
    console.log(
      "Some error occurred while fetching private content from firebase",
    );
    return null;
  }

  return parsePrivateContent(privateContentFromFirebase);
}

function parsePrivateContent(
  maybePrivateContent: unknown,
): PrivateContent | null {
  if (!maybePrivateContent) {
    console.log(
      "Cannot parse falsy private content value:",
      maybePrivateContent,
    );
    return null;
  }

  const parsed = PrivateContent.safeParse(maybePrivateContent);
  if (parsed.success) {
    return parsed.data;
  }
  console.log("Failed to parse as private content:", maybePrivateContent);
  console.log("Parsing error:", parsed.error);
  return null;
}
