import { For, type JSX, Show } from "solid-js";

import { classes, internalLinks } from "@/utils";
import { clearPrivateContentFromCache } from "@/store/private_content";

import { Button } from "@/components/buttons";
import { usePrivateContent } from "./usePrivateContent";

export function PrivateCardsCollection(): JSX.Element {
  const { privateContent } = usePrivateContent();

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
      <Button
        class="block ml-auto mb-4"
        variant="secondary"
        onClick={onClearCache}
      >
        Clear cache
      </Button>

      <Show when={hasItems()} fallback={<p>Nothing to show...</p>}>
        <div
          class={classes(`
            grid gap-4
            
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          `)}
        >
          <For each={privateContent()?.data ?? []}>
            {(card) => (
              <a
                class={classes(`
                  min-w-5 

                  hover:scale-105
                  focus-visible:scale-105
                  cursor-pointer

                  transition-all

                  bg-primary

                  rounded-lg
                  aspect-video
                  overflow-hidden
                `)}
                href={internalLinks.private.buildPrivateContentLinkFromId(
                  card.id,
                )}
              >
                <img
                  src={card.imageUrl}
                  alt="private content"
                  class="block w-full h-full"
                  loading="lazy"
                />
              </a>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
