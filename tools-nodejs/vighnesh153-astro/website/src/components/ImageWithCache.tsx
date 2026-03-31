import {
  useEffect,
  useState,
  type JSX,
  type ImgHTMLAttributes,
} from "react";

import { cacheImage } from "@/utils/image_caching.ts";

export type ImageWithCacheProps = {
  src: string;
  cacheKey: string;
  ttlMillis?: number;
  fallback?: JSX.Element;

  imageProps?: ImgHTMLAttributes<HTMLImageElement>;
};

export function ImageWithCache(props: ImageWithCacheProps): JSX.Element {
  const [objUrl, setObjUrl] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const cachedUrl = await cacheImage(props.src, props.cacheKey, {
          ttlMillis: props.ttlMillis,
        });
        setObjUrl(cachedUrl);
      } catch (e) {
        console.error(e);
      }
    }
    init();
  }, [props.src, props.cacheKey, props.ttlMillis]);

  return (
    <>
      {objUrl !== null ? (
        <img {...props.imageProps} src={objUrl!} />
      ) : (
        props.fallback
      )}
    </>
  );
}
