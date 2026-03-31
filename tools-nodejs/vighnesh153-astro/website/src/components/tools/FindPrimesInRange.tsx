import { useState, type JSX } from "react";

import { Button } from "@/components/buttons/index.ts";
import { isPrime, Queue } from "@vighnesh153/tools";

export function FindPrimesInRange(): JSX.Element {
  const [minN, setMinN] = useState(0);
  const [maxN, setMaxN] = useState(0);
  const [primesInRange, setPrimesInRange] = useState<number[]>([]);

  const onFind = () => {
    const start = Math.ceil(minN);
    const end = Math.floor(maxN);

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
      <p className=" text-text">
        Find primes in between a range (start and end inclusive)
      </p>

      <div className="mt-4 flex gap-6 items-center">
        <input
          className="p-2 text-secondary"
          type="number"
          value={minN}
          onChange={(e) => setMinN(+e.target.value)}
        />
        <input
          className="p-2 text-secondary"
          type="number"
          value={maxN}
          onChange={(e) => setMaxN(+e.target.value)}
        />

        <Button variant="primary" onClick={onFind}>Find</Button>
      </div>

      <div>
        {primesInRange.length > 0 && (
          <>
            <p className="text-text2">
              Count: <span className="text-accent">{primesInRange.length}</span>
            </p>
            <p className="text-text2">
              Values: <span className="text-text">{primesInRange.join(", ")}</span>
            </p>
          </>
        )}
      </div>
    </>
  );
}
