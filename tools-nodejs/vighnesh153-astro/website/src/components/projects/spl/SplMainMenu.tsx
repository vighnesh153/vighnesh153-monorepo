import type { JSX } from "react";
import { SplExamples } from "@vighnesh153/spl";
import { externalLinks, internalLinks } from "@/utils/content/links.ts";
import { logAnalyticsEvent } from "@/utils/firebase_config.ts";
import { Link } from "@/components/Link.tsx";

export function SplMainMenu(): JSX.Element {
  const onClickSrcCodeLink = () => {
    logAnalyticsEvent("visit_source_code", {
      title: "graphics projects",
    });
  };

  return (
    <div className="mt-12 relative flex justify-center items-center gap-20">
      <div className="flex flex-col gap-4 justify-center">
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
          onClick={onClickSrcCodeLink}
        >
          Source code
        </Link>
      </div>
      <div className="w-px h-80 bg-text4" />
      <div className="flex flex-col gap-4">
        <h2 className="text-lg text-center text-accent">Starter templates</h2>
        {SplExamples.map((example) => (
          <Link
            key={example.id}
            linkType="secondary-btn"
            href={internalLinks.projects.spl.editor(example.id)}
          >
            {example.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
