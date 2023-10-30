<script lang="ts">
  import { graphicsProjects } from '@vighnesh153/graphics-programming';

  import { classes } from '@/utils';
  import { internalLinks } from '@/constants';
</script>

<div class={classes('grid gap-10', 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3')}>
  {#each graphicsProjects as graphicsProject (graphicsProject.title)}
    <a
      class={classes(
        'group/card',

        'min-h-[180px] w-full',

        'flex flex-col items-center',

        'cursor-pointer rounded-2xl overflow-hidden',

        'bg-backgroundDark',
        // 'hover:bg-backgroundLight focus-visible:bg-backgroundLight',

        // 'shadow-md',
        'hover:shadow-xl focus-visible:shadow-xl',

        'shadow-text4',
        'hover:shadow-text4 focus-visible:shadow-text4'
      )}
      href={internalLinks.projects.graphicsProjects.buildProjectLinkFromId(graphicsProject.id)}
    >
      <img
        class={classes('block w-full aspect-video object-contain')}
        alt={graphicsProject.title}
        src={graphicsProject.imageLink}
        loading="lazy"
      />
      <span class={classes('my-3 text-xl text-text2', 'group-hover/card:text-text group-focus/card:text-text')}>
        {graphicsProject.title}
      </span>
    </a>
  {/each}
</div>
