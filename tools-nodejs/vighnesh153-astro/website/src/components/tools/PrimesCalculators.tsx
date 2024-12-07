import type { JSX } from "solid-js";

import { IsPrime } from "./IsPrime.tsx";
import { FindPreviousAndNextPrime } from "./FindPreviousAndNextPrime.tsx";
import { FindPrimesInRange } from "./FindPrimesInRange.tsx";

export function PrimesCalculators(): JSX.Element {
  return (
    <>
      <h2 class="text-2xl">Primes</h2>

      <hr class="mt-2 text-text4" />

      <div class="mt-4">
        <IsPrime />
      </div>

      <hr class="mt-2 text-text4" />

      <div class="mt-4">
        <FindPreviousAndNextPrime />
      </div>

      <hr class="mt-2 text-text4" />

      <div class="mt-4">
        <FindPrimesInRange />
      </div>
    </>
  );
}
