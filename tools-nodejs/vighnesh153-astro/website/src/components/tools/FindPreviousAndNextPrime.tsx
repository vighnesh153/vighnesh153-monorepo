import { createSignal, type JSX } from "solid-js";

import { Button } from "@/components/buttons/index.ts";
import { isPrime, not } from "@vighnesh153/tools";

export function FindPreviousAndNextPrime(): JSX.Element {
  const [n, setN] = createSignal(0);
  const [result, setResult] = createSignal("");

  const onFindPreviousClick = () => {
    const floor = Math.floor(n());

    let previousN = floor === n() ? floor - 1 : floor;

    while (not(isPrime(previousN)) && previousN > 1) {
      previousN--;
    }

    if (previousN <= 1) {
      setResult("No previous prime exists");
    } else {
      setResult(`Previous prime number is ${previousN}`);
    }
  };

  const onFindNextClick = () => {
    const ceil = Math.ceil(n());

    let nextN = ceil === n() ? ceil + 1 : ceil;

    while (not(isPrime(nextN))) {
      nextN++;
    }

    setResult(`Next prime number is ${nextN}`);
  };

  return (
    <>
      <p class=" text-text">Find Previous or Next prime</p>

      <div class="mt-4 flex gap-6 items-center">
        <input
          class="p-2 text-secondary"
          type="number"
          value={n()}
          onChange={(e) => setN(+e.target.value)}
        />

        <Button variant="primary" on:click={onFindPreviousClick}>
          Find Previous
        </Button>
        <Button variant="primary" on:click={onFindNextClick}>Find Next</Button>
      </div>

      <div>
        <p class="text-text2">{result()}</p>
      </div>
    </>
  );
}
