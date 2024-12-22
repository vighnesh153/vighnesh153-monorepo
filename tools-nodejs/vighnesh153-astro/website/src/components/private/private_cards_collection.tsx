import { createResource, For, type JSX, Show } from "solid-js";
import { useStore } from "@nanostores/solid";

import { classes } from "@/utils";
import { loggedInUserId } from "@/store/auth.ts";
import { getPrivateContent } from "@/store/private_content";

const fetchPrivateContent = (userId: string | null) =>
  getPrivateContent(userId);

export function PrivateCardsCollection(): JSX.Element {
  const $loggedInUserId = useStore(loggedInUserId);
  const [privateContent] = createResource($loggedInUserId, fetchPrivateContent);

  return (
    <div>
      <Show when={privateContent.loading}>
        <p>Loading...</p>
      </Show>
      <Show when={privateContent.error || privateContent() === null}>
        <p>Failed to fetch content.</p>
      </Show>
      <Show when={privateContent() !== null}>
        <div
          class={classes(`
        grid gap-4
        
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
      `)}
        >
          <For each={privateContent()?.data ?? []}>
            {(card) => (
              <div class="min-w-5 aspect-video bg-primary rounded-lg"></div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
