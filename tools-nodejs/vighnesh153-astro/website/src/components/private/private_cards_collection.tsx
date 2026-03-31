import type { JSX } from "react";

import { classes } from "@/utils/classes";
import { internalLinks } from "@/utils/content/links.ts";
import { clearPrivateContentFromCache } from "@/store/private_content";

import { Button } from "@/components/buttons";
import { ImageWithCache } from "@/components/ImageWithCache.tsx";
import { usePrivateContent } from "./usePrivateContent";

export function PrivateCardsCollection(): JSX.Element {
  const { privateContent } = usePrivateContent();

  const hasItems = () => {
    const content = privateContent()?.data ?? null;
    return content !== null && content.length > 0;
  };

  const onClearCache = () => {
    clearPrivateContentFromCache().then(() => location.reload());
  };

  return (
    <div>
      <Button
        className="block ml-auto mb-4"
        variant="secondary"
        onClick={onClearCache}
      >
        Clear cache
      </Button>

      {hasItems()
        ? (
          <div
            className={classes(`
            grid gap-4
            
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          `)}
          >
            {(privateContent()?.data ?? []).map((card) => {
              const imageUrl = new URL(card.imageUrl);
              return (
                <a
                  key={card.id}
                  className={classes(`
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
                  <ImageWithCache
                    src={imageUrl.toString()}
                    cacheKey={imageUrl.pathname}
                    imageProps={{
                      alt: "private content",
                      className: "block w-full h-full",
                      loading: "lazy",
                    }}
                  />
                </a>
              );
            })}
          </div>
        )
        : <p>Nothing to show...</p>}
    </div>
  );
}
