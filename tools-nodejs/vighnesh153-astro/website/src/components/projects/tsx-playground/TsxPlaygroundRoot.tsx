import { createEffect, createSignal, type JSX } from "solid-js";

import { classes } from "@/utils/index.ts";
import { debounce } from "@vighnesh153/tools";
import { bundle, starterCode } from "@vighnesh153/tsx-bundler";

import { CodePreview, type CodePreviewResult } from "./CodePreview";
import { SimpleCodeEditor } from "../SimpleCodeEditor";

export function TsxPlaygroundRoot(): JSX.Element {
  const [code, setCode] = createSignal(starterCode.trimStart());
  const [result, setResult] = createSignal<CodePreviewResult>({
    status: "bundling",
  });

  const runCode = debounce(async (inputCode: string) => {
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
  }, 1000);

  createEffect(() => {
    runCode(code());
  });

  return (
    <div class={classes("w-full mt-10", "h-[50vh]", "flex", "items-stretch")}>
      <div
        class={classes(
          "w-1/2",
          "bg-backgroundDark",
          "focus-within:outline-[transparent]",
          "z-[1]",
          "rounded-none",
        )}
      >
        <SimpleCodeEditor
          inputCode={code()}
          updateInputCode={(newCode) =>
            setCode(newCode)}
        />
      </div>
      <div class="w-1/2">
        <CodePreview result={result()} />
      </div>
    </div>
  );
}
