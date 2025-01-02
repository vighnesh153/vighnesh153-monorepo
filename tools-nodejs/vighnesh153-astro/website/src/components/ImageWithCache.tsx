import { createEffect, createSignal, type JSX, Show } from "solid-js";

import { cacheImage } from "@/utils/image_caching.ts";

export type ImageWithCacheProps = {
  src: string;
  cacheKey: string;
  ttlMillis?: number;
  fallback?: JSX.Element;

  imageProps?: JSX.ImgHTMLAttributes<HTMLImageElement>;
};

export function ImageWithCache(props: ImageWithCacheProps): JSX.Element {
  const [objUrl, setObjUrl] = createSignal<string | null>(null);

  createEffect(async () => {
    try {
      const cachedUrl = await cacheImage(props.src, props.cacheKey, {
        ttlMillis: props.ttlMillis,
      });
      setObjUrl(cachedUrl);
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <Show when={objUrl() !== null} fallback={props.fallback}>
      <img {...props.imageProps} src={objUrl()!} />
    </Show>
  );
}
