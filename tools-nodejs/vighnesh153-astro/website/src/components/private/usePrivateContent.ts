import { createResource } from "solid-js";
import { useStore } from "@nanostores/solid";

import { loggedInUserId } from "@/store/auth";
import { getPrivateContent } from "@/store/private_content";

const fetchPrivateContent = (userId: string | null) =>
  getPrivateContent(userId);

export function usePrivateContent() {
  const $loggedInUserId = useStore(loggedInUserId);
  const [privateContent] = createResource($loggedInUserId, fetchPrivateContent);

  return { privateContent };
}
