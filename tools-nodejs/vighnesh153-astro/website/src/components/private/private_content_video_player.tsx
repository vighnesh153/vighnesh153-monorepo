import { type JSX, useRef } from "react";

import { classes } from "@/utils/classes.ts";
import { usePrivateContent } from "./usePrivateContent.ts";

const seekSpeed = 5; // seconds

export type PrivateContentProps = {
  id: string;
};

export function PrivateContentVideoPlayer(
  props: PrivateContentProps,
): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { privateContent } = usePrivateContent();

  const item = privateContent()?.data.find((it) => it.id === props.id) ?? null;

  return (
    <div>
      {item !== null
        ? (
          <video
            ref={videoRef}
            controls
            className={classes(
              `
              mx-auto mb-4 
              w-full max-w-2xl 
              aspect-video 
            `,
            )}
            onKeyDown={(e) => {
              if (videoRef.current === null) return;
              if (e.code === "ArrowLeft") {
                e.preventDefault();
                videoRef.current.currentTime = Math.max(
                  videoRef.current.currentTime - seekSpeed,
                  0,
                );
              } else if (e.code === "ArrowRight") {
                e.preventDefault();
                videoRef.current.currentTime = Math.min(
                  videoRef.current.currentTime + seekSpeed,
                  videoRef.current.duration,
                );
              }
            }}
          >
            <source src={item!.videoUrl} />
          </video>
        )
        : <p>Content not found for given id...</p>}
    </div>
  );
}
