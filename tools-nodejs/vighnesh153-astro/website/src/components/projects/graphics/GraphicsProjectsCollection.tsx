import { For } from "solid-js";

import { graphicsProjects } from "@vighnesh153/tools-browser/graphics_programming";

import { classes, internalLinks } from "@/utils/index.ts";
import { CanvasProjectCard } from "@/components/CanvasProjectCard.tsx";

export function GraphicsProjectsCollection() {
  return (
    <div
      class={classes(
        "grid gap-10",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      <For each={graphicsProjects}>
        {(graphicsProject) => (
          <CanvasProjectCard
            title={graphicsProject.title}
            imageLink={graphicsProject.imageLink}
            link={internalLinks.projects.graphicsProjects
              .buildProjectLinkFromId(
                graphicsProject.id,
              )}
          />
        )}
      </For>
    </div>
  );
}
