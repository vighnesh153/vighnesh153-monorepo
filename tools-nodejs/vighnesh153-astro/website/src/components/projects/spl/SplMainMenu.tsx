import { For } from "solid-js";
import { SplExamples } from "@vighnesh153/spl";
import {
  externalLinks,
  internalLinks,
  logAnalyticsEvent,
} from "@/utils/index.ts";
import { Link } from "@/components/Link.tsx";

export function SplMainMenu() {
  const onClickSrcCodeLink = () => {
    logAnalyticsEvent("visit_source_code", {
      project: "graphics projects",
    });
  };

  return (
    <div class="mt-12 relative flex justify-center items-center gap-20">
      <div class="flex flex-col gap-4 justify-center">
        <Link
          linkType="primary-btn"
          target="_blank"
          href={externalLinks.projects.spl.learnSyntax}
        >
          Learn Syntax
        </Link>
        <Link
          linkType="secondary-btn"
          href={internalLinks.projects.spl.editor()}
        >
          Blank Template
        </Link>
        <Link
          linkType="secondary-btn"
          target="_blank"
          href={externalLinks.projects.spl.sourceCode}
          on:click={onClickSrcCodeLink}
        >
          Source code
        </Link>
      </div>
      <div class="w-[1px] h-80 bg-text4" />
      <div class="flex flex-col gap-4">
        <h2 class="text-lg text-center text-accent">Starter templates</h2>
        <For each={SplExamples}>
          {(example) => (
            <Link
              linkType="secondary-btn"
              href={internalLinks.projects.spl.editor(example.id)}
            >
              {example.name}
            </Link>
          )}
        </For>
      </div>
    </div>
  );
}
