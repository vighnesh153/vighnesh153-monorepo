import { useState, type JSX } from "react";

import { Button } from "@/components/buttons/index.ts";
import {
  isPrime,
  primeFactorize,
  type PrimeFactorsCount,
} from "@vighnesh153/tools";

export function IsPrime(): JSX.Element {
  const [n, setN] = useState(0);
  const [nIsPrime, setNIsPrime] = useState<boolean | null>(null);
  const [result, setResult] = useState("");
  const [primeFactors, setPrimeFactors] = useState<PrimeFactorsCount>({});

  function onClick() {
    const isNPrime = isPrime(n);
    setNIsPrime(isNPrime);
    if (isNPrime) {
      setResult(`${n} is a prime number`);
    } else {
      setResult(`${n} is not a prime number`);
    }
    setPrimeFactors(primeFactorize(n));
  }

  return (
    <>
      <p className=" text-text">
        Check if a number is a prime number (max 16 digit numbers)
      </p>

      <div className="mt-4 flex gap-6 items-center">
        <input
          className="p-2 text-secondary"
          type="number"
          value={n}
          onChange={(e) => {
            const val = parseInt(
              `${e.currentTarget.value}`
                .split("")
                .filter((ch) => "0123456789".includes(ch))
                .join(""),
              10,
            );
            setN(isNaN(val) ? 1 : val);
          }}
          min="0"
          step="1"
        />

        <Button variant="primary" onClick={onClick}>Check</Button>
      </div>

      <div>
        {nIsPrime !== null && (
          <p className="text-text2">{result}</p>
        )}

        {Object.keys(primeFactors).length > 0 && (
          <p>
            <span className="text-text2">Prime Factorization:&nbsp;</span>
            {Object.entries(primeFactors).map(([prime, factors], index) => (
              <span key={prime} className="text-accent">
                {prime}
                {factors > 1 && (
                  <sup>{factors}</sup>
                )}
                {index !== Object.keys(primeFactors).length - 1 && (
                  " x "
                )}
              </span>
            ))}
          </p>
        )}
      </div>
    </>
  );
}
