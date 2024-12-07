import { baseIframeHtmlCode } from "@vighnesh153/tsx-bundler";
import { createEffect, Match, mergeProps, Switch } from "solid-js";

export type CodePreviewResult_Bundling = {
  status: "bundling";
};
export type CodePreviewResult_Success = {
  status: "success";
  outputCode: string;
};

export type CodePreviewResult_Error = {
  status: "error";
  bundleError: string;
};

export type CodePreviewResult =
  | CodePreviewResult_Bundling
  | CodePreviewResult_Success
  | CodePreviewResult_Error;

export type CodePreviewProps = {
  result?: CodePreviewResult;
};

export function CodePreview(incomingProps: CodePreviewProps) {
  let previewIframe!: HTMLIFrameElement;

  const props = mergeProps<CodePreviewProps[]>({
    result: {
      status: "bundling",
    },
  }, incomingProps);

  const result = () => props.result!;

  createEffect(() => {
    if (result().status === "success" && previewIframe) {
      const outputCode = (result() as CodePreviewResult_Success).outputCode;
      previewIframe.srcdoc = baseIframeHtmlCode;
      setTimeout(() => {
        previewIframe.contentWindow?.postMessage(outputCode);
      }, 50);
    }
  });

  return (
    <div class="w-full h-full p-4 bg-text">
      <Switch
        fallback={
          <iframe
            ref={previewIframe}
            class="w-full h-full"
            title="preview"
            sandbox="allow-same-origin allow-scripts"
            srcdoc={baseIframeHtmlCode}
          />
        }
      >
        <Match when={result().status === "bundling"}>
          <div class="text-background">Bundling...</div>
        </Match>
        <Match when={result().status === "error"}>
          <div class="text-[red] whitespace-pre overflow-x-auto">
            <div class="font-bold text-xl">
              Some error occurred while bundling
            </div>
            <div class="whitespace-break-spaces">
              {(result() as CodePreviewResult_Error).bundleError}
            </div>
          </div>
        </Match>
      </Switch>
    </div>
  );
}
