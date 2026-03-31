import { useEffect, useState, type JSX, useCallback } from "react";

import { classes } from "@/utils/classes.ts";
import { debounce } from "@vighnesh153/tools";
import { bundle, starterCode } from "@vighnesh153/tsx-bundler";

import { CodePreview, type CodePreviewResult } from "./CodePreview";
import { SimpleCodeEditor } from "../SimpleCodeEditor";

export function TsxPlaygroundRoot(): JSX.Element {
  const [code, setCode] = useState(starterCode.trimStart());
  const [result, setResult] = useState<CodePreviewResult>({
    status: "bundling",
  });

  const runCode = useCallback(
    debounce(async (inputCode: string) => {
      setResult({ status: "bundling" });

      const bundleResult = await bundle(inputCode);

      if (bundleResult.status === "success") {
        setResult({
          status: "success",
          outputCode: bundleResult.outputCode,
        });
      } else {
        setResult({
          status: "error",
          bundleError: bundleResult.error,
        });
      }
    }, 1000),
    [],
  );

  useEffect(() => {
    runCode(code);
  }, [code, runCode]);

  return (
    <div className={classes("w-full mt-10", "h-[50vh]", "flex", "items-stretch")}>
      <div
        className={classes(
          "w-1/2",
          "bg-bg-dark",
          "focus-within:outline-[transparent]",
          "z-[1]",
          "rounded-none",
        )}
      >
        <SimpleCodeEditor
          inputCode={code}
          updateInputCode={(newCode) => setCode(newCode)}
        />
      </div>
      <div className="w-1/2">
        <CodePreview result={result} />
      </div>
    </div>
  );
}
