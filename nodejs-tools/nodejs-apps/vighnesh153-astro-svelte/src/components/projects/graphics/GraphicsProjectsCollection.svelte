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

        'min-h-[180px] w-full p-2',

        'flex flex-col items-center',

        'cursor-pointer rounded-2xl',

        'bg-backgroundDark',
        'hover:bg-backgroundLight focus-visible:bg-backgroundLight',

        'shadow-md',
        'hover:shadow-xl focus-visible:shadow-xl',

        'shadow-text4',
        'hover:shadow-text4 focus-visible:shadow-text4'
      )}
      href={internalLinks.projects.graphicsProjects.buildProjectLinkFromId(graphicsProject.id)}
    >
      <img
        class={classes('block w-10/12 h-4/5 object-contain', 'border rounded-xl border-text4')}
        alt={graphicsProject.title}
        src={graphicsProject.imageLink}
      />
      <p class={classes('mt-1 text-xl text-text2', 'group-hover/card:text-text group-focus/card:text-text')}>
        {graphicsProject.title}
      </p>
    </a>
  {/each}
</div>
