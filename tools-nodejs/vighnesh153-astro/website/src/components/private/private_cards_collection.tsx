import {
  createResource,
  ErrorBoundary,
  For,
  type JSX,
  Show,
  Suspense,
} from "solid-js";
import { useStore } from "@nanostores/solid";

import { classes } from "@/utils";
import { loggedInUserId } from "@/store/auth.ts";
import {
  clearPrivateContentFromCache,
  getPrivateContent,
} from "@/store/private_content";
import { Button } from "../buttons";

const fetchPrivateContent = (userId: string | null) =>
  getPrivateContent(userId);

export function PrivateCardsCollectionWrapper(): JSX.Element {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Some error occurred while fetching data.</p>}>
        <PrivateCardsCollection />
      </ErrorBoundary>
    </Suspense>
  );
}

function PrivateCardsCollection(): JSX.Element {
  const $loggedInUserId = useStore(loggedInUserId);
  const [privateContent] = createResource($loggedInUserId, fetchPrivateContent);

  const hasItems = () => {
    const content = privateContent()?.data ?? null;
    if (content === null) {
      return false;
    }
    return content !== null && content.length > 0;
  };

  const onClearCache = () => {
    clearPrivateContentFromCache().then(() => location.reload());
  };

  return (
    <div>
      <div class="mb-4 flex justify-end">
        <Button variant="secondary" onClick={onClearCache}>
          Clear cache
        </Button>
      </div>
      <Show when={privateContent.error || privateContent() === null}>
        <p>Failed to fetch content.</p>
      </Show>
      <Show when={hasItems()} fallback={<p>Nothing to show...</p>}>
        <div
          class={classes(`
            grid gap-4
            
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          `)}
        >
          <For each={privateContent()?.data ?? []}>
            {(card) => (
              <button
                class={classes(`
                  min-w-5 

                  hover:scale-105
                  transition-all
                  
                  bg-primary
                  
                  rounded-lg
                  aspect-video
                  overflow-hidden
                `)}
              >
                <img
                  src={card.imageUrl}
                  alt="private content"
                  class="block w-full h-full"
                />
              </button>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
