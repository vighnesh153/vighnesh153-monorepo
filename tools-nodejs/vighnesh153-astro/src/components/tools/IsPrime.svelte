<script lang="ts">
  import Button from '@/components/Button.svelte';
  import { isPrime, primeFactorize, type PrimeFactorsCount } from '@vighnesh153/tools';

  let n: number = 0;

  let nIsPrime: boolean | null = null;
  let result = '';
  let primeFactors: PrimeFactorsCount = {};

  function onClick() {
    nIsPrime = isPrime(n);
    if (nIsPrime) {
      result = `${n} is a prime number`;
    } else {
      result = `${n} is not a prime number`;
    }
    primeFactors = primeFactorize(n);
  }
</script>

<p class=" text-text">Check if a number is a prime number (max 16 digit numbers)</p>

<div class="mt-4 flex gap-6 items-center">
  <input
    class="p-2 text-secondary"
    type="number"
    value={n}
    on:input={(e) => {
      n = parseInt(
        `${e.currentTarget.value}`
          .split('')
          .filter((ch) => '0123456789'.includes(ch))
          .join(''),
        10
      );
      if (isNaN(n)) {
        n = 1;
      }
    }}
    min="0"
    step="1"
  />

  <Button variant="primary" on:click={onClick}>Check</Button>
</div>

<div>
  {#if nIsPrime !== null}
    <p class="text-text2">{result}</p>
  {/if}

  {#if Object.keys(primeFactors).length > 0}
    <p>
      <span class="text-text2">Prime Factorization: </span>
      {#each Object.entries(primeFactors) as [prime, factors], index}
        <span class="text-accent">
          {prime}
          {#if factors > 1}
            <sup>{factors}</sup>
          {/if}
          {index === Object.keys(primeFactors).length - 1 ? '' : ' x '}
        </span>
      {/each}
    </p>
  {/if}
</div>
