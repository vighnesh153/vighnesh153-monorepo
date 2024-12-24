import { type JSX, Show } from "solid-js";

import { classes } from "@/utils";
import { usePrivateContent } from "./usePrivateContent";

const seekSpeed = 5; // seconds

export type PrivateContentProps = {
  id: string;
};

export function PrivateContentVideoPlayer(
  props: PrivateContentProps,
): JSX.Element {
  let videoRef!: HTMLVideoElement;
  const { privateContent } = usePrivateContent();

  const item = () =>
    privateContent()?.data.find((it) => it.id === props.id) ?? null;

  return (
    <div>
      <Show
        when={item() !== null}
        fallback={<p>Content not found for given id...</p>}
      >
        <video
          ref={videoRef}
          controls
          class={classes(
            `
              mx-auto mb-4 
              w-full max-w-2xl 
              aspect-video 
            `,
          )}
          onKeyDown={(e) => {
            if (e.code === "ArrowLeft") {
              e.preventDefault();
              videoRef.currentTime = Math.max(
                videoRef.currentTime - seekSpeed,
                0,
              );
            } else if (e.code === "ArrowRight") {
              e.preventDefault();
              videoRef.currentTime = Math.min(
                videoRef.currentTime + seekSpeed,
                videoRef.duration,
              );
            }
          }}
        >
          <source src={item()!.videoUrl} />
        </video>
      </Show>
    </div>
  );
}
