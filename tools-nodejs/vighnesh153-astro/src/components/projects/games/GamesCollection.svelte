<script lang="ts">
  import { gamesProjects } from "@vighnesh153/tools-browser/graphics_programming";

  import { classes, internalLinks } from "@/utils/index.ts";
  import CanvasProjectCard from "@/components/CanvasProjectCard.svelte";
</script>

<div
  class={classes("grid gap-10", "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}
>
  {#each gamesProjects as game (game.title)}
    <CanvasProjectCard
      title={game.title}
      imageLink={game.imageLink}
      link={internalLinks.projects.games.buildProjectLinkFromId(game.id)}
    />
  {/each}
</div>
