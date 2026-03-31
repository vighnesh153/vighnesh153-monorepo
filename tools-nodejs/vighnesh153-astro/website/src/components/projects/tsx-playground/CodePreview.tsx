import { baseIframeHtmlCode } from "@vighnesh153/tsx-bundler";
import { useEffect, useRef, type JSX } from "react";

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

export function CodePreview({
  result = { status: "bundling" },
}: CodePreviewProps): JSX.Element {
  const previewIframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (result.status === "success" && previewIframe.current) {
      const outputCode = result.outputCode;
      previewIframe.current.srcdoc = baseIframeHtmlCode;
      const timeout = setTimeout(() => {
        previewIframe.current?.contentWindow?.postMessage(outputCode, "*");
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [result]);

  return (
    <div className="w-full h-full p-4 bg-text">
      {result.status === "bundling" ? (
        <div className="text-background">Bundling...</div>
      ) : result.status === "error" ? (
        <div className="text-[red] whitespace-pre overflow-x-auto">
          <div className="font-bold text-xl">
            Some error occurred while bundling
          </div>
          <div className="whitespace-break-spaces">
            {result.bundleError}
          </div>
        </div>
      ) : (
        <iframe
          ref={previewIframe}
          className="w-full h-full"
          title="preview"
          sandbox="allow-same-origin allow-scripts"
          srcDoc={baseIframeHtmlCode}
        />
      )}
    </div>
  );
}
