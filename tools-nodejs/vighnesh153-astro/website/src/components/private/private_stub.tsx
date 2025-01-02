import { For, type JSX, Show } from "solid-js";
import { not } from "@vighnesh153/tools";

import { ImageWithCache } from "@/components/ImageWithCache.tsx";
import { useAccidentalPrivatePageOpenStubBreaker } from "@/hooks/mod.ts";
import { PrivateContentWrapper } from "./private_content_wrapper";

const prefix =
  "https://firebasestorage.googleapis.com/v0/b/vighnesh153-app.firebasestorage.app/o/public%2Fprivate-stub%2F";

const images = [
  "adorable-ragdoll-cat-beautiful-blue-600nw-1992318023.webp?alt=media",
  // "adult-fluffy-ragdoll-cat-outside-600nw-1467863648.webp?alt=media",
  // "cute-gray-cat-kitten-looking-600nw-2386006989.webp?alt=media",
  // "happy-dog-running-blossoming-flower-600nw-2458562695.webp?alt=media",
  // "happy-labrador-dog-water-splashes-600nw-2470403137.webp?alt=media",
  // "savannah-cat-beautiful-spotted-striped-600nw-589366805.webp?alt=media",
  // "sphynx-cat-naked-600nw-1058785700.webp?alt=media",
  // "tabby-cat-169-ratio-600nw-44442067.webp?alt=media",
  // "young-cute-bengal-cat-sitting-600nw-2238825697.webp?alt=media",
];

export function PrivateStub(): JSX.Element {
  const { pageAccessible, onKey } = useAccidentalPrivatePageOpenStubBreaker({
    pageKey: "/private",
  });

  return (
    <Show when={not(pageAccessible())} fallback={<PrivateContentWrapper />}>
      <div class="grid columns-1 gap-6">
        <For each={images}>
          {(p, index) => {
            const url = new URL(prefix + p);
            return (
              <ImageWithCache
                src={url.toString()}
                cacheKey={url.pathname}
                imageProps={{
                  class: "block w-full",
                  onClick: () => onKey((index() + 1).toString()),
                }}
              />
            );
          }}
        </For>
      </div>
    </Show>
  );
}
