import { createSignal, type JSX, Show } from "solid-js";

import { Button } from "@/components/buttons/index.ts";
import { isPrime, Queue } from "@vighnesh153/tools";

export function FindPrimesInRange(): JSX.Element {
  const [minN, setMinN] = createSignal(0);
  const [maxN, setMaxN] = createSignal(0);
  const [primesInRange, setPrimesInRange] = createSignal<number[]>([]);

  const onFind = () => {
    const start = Math.ceil(minN());
    const end = Math.floor(maxN());

    const primes = new Queue<number>();
    for (let i = start; i <= end; i++) {
      if (isPrime(i)) {
        primes.pushRight(i);
      }
    }
    setPrimesInRange(primes.toArray());
  };

  return (
    <>
      <p class=" text-text">
        Find primes in between a range (start and end inclusive)
      </p>

      <div class="mt-4 flex gap-6 items-center">
        <input
          class="p-2 text-secondary"
          type="number"
          value={minN()}
          onChange={(e) => setMinN(+e.target.value)}
        />
        <input
          class="p-2 text-secondary"
          type="number"
          value={maxN()}
          onChange={(e) => setMaxN(+e.target.value)}
        />

        <Button variant="primary" onClick={onFind}>Find</Button>
      </div>

      <div>
        <Show when={primesInRange().length > 0}>
          <p class="text-text2">
            Count: <span class="text-accent">{primesInRange().length}</span>
          </p>
          <p class="text-text2">
            Values: <span class="text-text">{primesInRange().join(", ")}</span>
          </p>
        </Show>
      </div>
    </>
  );
}
