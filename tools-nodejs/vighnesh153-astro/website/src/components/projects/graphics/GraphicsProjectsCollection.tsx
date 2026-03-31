import type { JSX } from "react";

import { graphicsProjects } from "@/utils/content/graphics_projects.ts";

import { classes } from "@/utils/classes.ts";
import { internalLinks } from "@/utils/content/links.ts";
import { CanvasProjectCard } from "@/components/CanvasProjectCard.tsx";

export function GraphicsProjectsCollection(): JSX.Element {
  return (
    <div
      className={classes(
        "grid gap-10",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {graphicsProjects.map((graphicsProject) => (
        <CanvasProjectCard
          key={graphicsProject.id}
          title={graphicsProject.title}
          imageLink={graphicsProject.imageLink}
          link={internalLinks.projects.graphicsProjects
            .buildProjectLinkFromId(
              graphicsProject.id,
            )}
        />
      ))}
    </div>
  );
}
