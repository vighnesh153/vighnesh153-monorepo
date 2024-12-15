import { createSignal, For, type JSX, Show } from "solid-js";

import { Button } from "@/components/buttons/index.ts";
import {
  isPrime,
  primeFactorize,
  type PrimeFactorsCount,
} from "@vighnesh153/tools";

export function IsPrime(): JSX.Element {
  const [n, setN] = createSignal(0);
  const [nIsPrime, setNIsPrime] = createSignal<boolean | null>(null);
  const [result, setResult] = createSignal("");
  const [primeFactors, setPrimeFactors] = createSignal<PrimeFactorsCount>({});

  function onClick() {
    setNIsPrime(isPrime(n()));
    if (nIsPrime()) {
      setResult(`${n()} is a prime number`);
    } else {
      setResult(`${n()} is not a prime number`);
    }
    setPrimeFactors(primeFactorize(n()));
  }

  return (
    <>
      <p class=" text-text">
        Check if a number is a prime number (max 16 digit numbers)
      </p>

      <div class="mt-4 flex gap-6 items-center">
        <input
          class="p-2 text-secondary"
          type="number"
          value={n()}
          onInput={(e) => {
            setN(parseInt(
              `${e.currentTarget.value}`
                .split("")
                .filter((ch) => "0123456789".includes(ch))
                .join(""),
              10,
            ));
            if (isNaN(n())) {
              setN(1);
            }
          }}
          min="0"
          step="1"
        />

        <Button variant="primary" onClick={onClick}>Check</Button>
      </div>

      <div>
        <Show when={nIsPrime() !== null}>
          <p class="text-text2">{result()}</p>
        </Show>

        <Show when={Object.keys(primeFactors()).length > 0}>
          <p>
            <span class="text-text2">Prime Factorization:&nbsp;</span>
            <For each={Object.entries(primeFactors())}>
              {([prime, factors], index) => (
                <span class="text-accent">
                  {prime}
                  <Show when={factors > 1}>
                    <sup>{factors}</sup>
                  </Show>
                  <Show
                    when={index() !== Object.keys(primeFactors()).length - 1}
                  >
                    {" x "}
                  </Show>
                </span>
              )}
            </For>
          </p>
        </Show>
      </div>
    </>
  );
}
