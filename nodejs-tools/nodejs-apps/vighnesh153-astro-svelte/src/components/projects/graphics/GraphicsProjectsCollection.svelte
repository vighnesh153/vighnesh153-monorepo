<script lang="ts">
  import { graphicsProjects } from '@vighnesh153/graphics-programming';

  import { classes } from '@/utils';
  import { internalLinks } from '@/constants';
  import CanvasProjectCard from '@/components/CanvasProjectCard.svelte';
</script>

<div class={classes('grid gap-10', 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3')}>
  {#each graphicsProjects as graphicsProject (graphicsProject.title)}
    <CanvasProjectCard
      title={graphicsProject.title}
      imageLink={graphicsProject.imageLink}
      link={internalLinks.projects.graphicsProjects.buildProjectLinkFromId(graphicsProject.id)}
    />
  {/each}
</div>
