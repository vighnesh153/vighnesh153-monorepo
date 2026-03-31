import type { JSX } from "react";
import { gamesProjects } from "@vighnesh153/tools-browser/graphics_programming";
import { classes } from "@/utils/classes.ts";
import { internalLinks } from "@/utils/content/links.ts";
import { CanvasProjectCard } from "@/components/CanvasProjectCard.tsx";

export function GamesCollection(): JSX.Element {
  return (
    <div
      className={classes(
        "grid gap-10",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {gamesProjects.map((game) => (
        <CanvasProjectCard
          key={game.id}
          title={game.title}
          imageLink={game.imageLink}
          link={internalLinks.projects.games.buildProjectLinkFromId(game.id)}
        />
      ))}
    </div>
  );
}
