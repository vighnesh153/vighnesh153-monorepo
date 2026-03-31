import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";

import { loggedInUserId } from "@/store/auth";
import { getPrivateContent } from "@/store/private_content";
import type { PrivateContent } from "@/models/private_content";

export function usePrivateContent() {
  const $loggedInUserId = useStore(loggedInUserId);
  const [privateContent, setPrivateContent] = useState<PrivateContent | null>(null);

  useEffect(() => {
    async function init() {
      const content = await getPrivateContent($loggedInUserId);
      setPrivateContent(content);
    }
    init();
  }, [$loggedInUserId]);

  return { privateContent: () => privateContent };
}
