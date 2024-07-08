<script lang="ts">
  import Button from '@/components/Button.svelte';
  import { Queue, isPrime } from '@vighnesh153/tools-platform-independent';

  let minN: number = 0;
  let maxN: number = 0;
  let primesInRange: number[] = [];

  function onFind() {
    const start = Math.ceil(minN);
    const end = Math.floor(maxN);

    const primes = new Queue<number>();
    for (let i = start; i <= end; i++) {
      if (isPrime(i)) {
        primes.pushRight(i);
      }
    }
    primesInRange = primes.toArray();
  }
</script>

<p class=" text-text">Find primes in between a range</p>

<div class="mt-4 flex gap-6 items-center">
  <input class="p-2 text-secondary" type="number" bind:value={minN} />
  <input class="p-2 text-secondary" type="number" bind:value={maxN} />

  <Button variant="primary" on:click={onFind}>Find</Button>
</div>

<div>
  {#if primesInRange.length > 0}
    <p class="text-text2">Count: <span class="text-accent">{primesInRange.length}</span></p>
    <p class="text-text2">Values: <span class="text-text">{primesInRange.join(', ')}</span></p>
  {/if}
</div>
