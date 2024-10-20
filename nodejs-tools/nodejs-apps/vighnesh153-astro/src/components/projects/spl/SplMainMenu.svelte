<script lang="ts">
  import { SplExamples } from '@vighnesh153/spl';
  import { externalLinks, internalLinks } from '@/utils/index.ts';
  import Link from '@/components/Link.svelte';
</script>

<div class="mt-12 relative flex justify-center items-center gap-20">
  <div class="flex flex-col gap-4 justify-center">
    <Link linkType="primary-btn" target="_blank" href={externalLinks.projects.spl.learnSyntax}>Learn Syntax</Link>
    <Link linkType="secondary-btn" href={internalLinks.projects.spl.editor()}>Blank Template</Link>
    <Link linkType="secondary-btn" target="_blank" href={externalLinks.projects.spl.sourceCode}>Source code</Link>
  </div>
  <div class="w-[1px] h-80 bg-text4" />
  <div class="flex flex-col gap-4">
    <h2 class="text-lg text-center text-accent">Starter template</h2>
    {#each SplExamples as example (example.id)}
      <Link linkType="secondary-btn" href={internalLinks.projects.spl.editor(example.id)}>{example.name}</Link>
    {/each}
  </div>
</div>
