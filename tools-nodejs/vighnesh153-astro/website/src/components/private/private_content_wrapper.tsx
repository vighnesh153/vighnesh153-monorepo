import {
  createSignal,
  ErrorBoundary,
  type JSX,
  onMount,
  Show,
  Suspense,
} from "solid-js";

import { PrivateCardsCollection } from "./private_cards_collection.tsx";
import { PrivateContentVideoPlayer } from "./private_content_video_player.tsx";

export function PrivateContentWrapper(): JSX.Element {
  const [contentId, setContentId] = createSignal<string | null>(null);

  onMount(() => {
    const search = new URLSearchParams(location.search);
    setContentId(search.get("contentId") ?? null);
  });

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Some error occurred while fetching data.</p>}>
        <Show when={contentId() !== null} fallback={<PrivateCardsCollection />}>
          <PrivateContentVideoPlayer id={contentId()!} />
        </Show>
      </ErrorBoundary>
    </Suspense>
  );
}
