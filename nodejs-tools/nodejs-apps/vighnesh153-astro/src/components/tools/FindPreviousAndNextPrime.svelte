<script lang="ts">
  import Button from '@/components/Button.svelte';
  import { isPrime, not } from '@vighnesh153/tools-platform-independent';

  let n: number = 0;
  let result = '';

  function onFindPreviousClick() {
    const floor = Math.floor(n);

    let previousN = floor === n ? floor - 1 : floor;

    while (not(isPrime(previousN)) && previousN > 1) {
      previousN--;
    }

    if (previousN <= 1) {
      result = 'No previous prime exists';
    } else {
      result = `Previous prime number is ${previousN}`;
    }
  }

  function onFindNextClick() {
    const ceil = Math.ceil(n);

    let nextN = ceil === n ? ceil + 1 : ceil;

    while (not(isPrime(nextN))) {
      nextN++;
    }

    result = `Next prime number is ${nextN}`;
  }
</script>

<p class=" text-text">Find Previous or Next prime</p>

<div class="mt-4 flex gap-6 items-center">
  <input class="p-2 text-secondary" type="number" bind:value={n} />

  <Button variant="primary" on:click={onFindPreviousClick}>Find Previous</Button>
  <Button variant="primary" on:click={onFindNextClick}>Find Next</Button>
</div>

<div>
  <p class="text-text2">{result}</p>
</div>
