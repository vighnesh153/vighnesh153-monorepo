<script lang="ts">
  import { classes } from '@/utils/index.ts';

  export let title: string;
  export let link: string;
  export let imageLink: string;
</script>

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
  href={link}
>
  <img class={classes('block w-full aspect-video object-contain')} alt={title} src={imageLink} loading="lazy" />
  <span class={classes('my-3 text-xl text-text2', 'group-hover/card:text-text group-focus/card:text-text')}>
    {title}
  </span>
</a>
