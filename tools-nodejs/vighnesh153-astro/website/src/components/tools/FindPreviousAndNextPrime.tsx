import { useState, type JSX } from "react";

import { Button } from "@/components/buttons/index.ts";
import { isPrime, not } from "@vighnesh153/tools";

export function FindPreviousAndNextPrime(): JSX.Element {
  const [n, setN] = useState(0);
  const [result, setResult] = useState("");

  const onFindPreviousClick = () => {
    const floor = Math.floor(n);

    let previousN = floor === n ? floor - 1 : floor;

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
    const ceil = Math.ceil(n);

    let nextN = ceil === n ? ceil + 1 : ceil;

    while (not(isPrime(nextN))) {
      nextN++;
    }

    setResult(`Next prime number is ${nextN}`);
  };

  return (
    <>
      <p className=" text-text">Find Previous or Next prime</p>

      <div className="mt-4 flex gap-6 items-center">
        <input
          className="p-2 text-secondary"
          type="number"
          value={n}
          onChange={(e) => setN(+e.target.value)}
        />

        <Button variant="primary" onClick={onFindPreviousClick}>
          Find Previous
        </Button>
        <Button variant="primary" onClick={onFindNextClick}>Find Next</Button>
      </div>

      <div>
        <p className="text-text2">{result}</p>
      </div>
    </>
  );
}
