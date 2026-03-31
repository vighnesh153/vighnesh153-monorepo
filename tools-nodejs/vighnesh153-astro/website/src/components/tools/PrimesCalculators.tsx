import type { JSX } from "react";

import { IsPrime } from "./IsPrime.tsx";
import { FindPreviousAndNextPrime } from "./FindPreviousAndNextPrime.tsx";
import { FindPrimesInRange } from "./FindPrimesInRange.tsx";

export function PrimesCalculators(): JSX.Element {
  return (
    <>
      <h2 className="text-2xl">Primes</h2>

      <hr className="mt-2 text-text4" />

      <div className="mt-4">
        <IsPrime />
      </div>

      <hr className="mt-2 text-text4" />

      <div className="mt-4">
        <FindPreviousAndNextPrime />
      </div>

      <hr className="mt-2 text-text4" />

      <div className="mt-4">
        <FindPrimesInRange />
      </div>
    </>
  );
}
