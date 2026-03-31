import { type JSX, Suspense, useEffect, useState } from "react";

import { PrivateCardsCollection } from "./private_cards_collection.tsx";
import { PrivateContentVideoPlayer } from "./private_content_video_player.tsx";

export function PrivateContentWrapper(): JSX.Element {
  const [contentId, setContentId] = useState<string | null>(null);

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    setContentId(search.get("contentId") ?? null);
  }, []);

  if (contentId == null) {
    return <PrivateCardsCollection />;
  }

  return <PrivateContentVideoPlayer id={contentId} />;
}
