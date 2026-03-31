import type { JSX, ReactNode } from "react";
import {
  ResumeSectionSubtitle,
  ResumeSectionTitle,
} from "./ResumeSectionTitle";
import { ResumeLink } from "./ResumeLink";
import { internalLinks } from "@/utils/content/links.ts";

export function ResumeProjectsSection(
  props: { className?: string },
): JSX.Element {
  return (
    <div className={props.className}>
      <ResumeSectionTitle text="Projects" />

      <Project
        title="SPL Programming language"
        link={`${internalLinks.domain}${internalLinks.projects.spl.mainMenu}`}
        description="A toy programming language to understand what it takes to build a programming language with frighteningly little understanding of compiler design."
      />

      <Project
        title="Tsx Playground"
        link={`${internalLinks.domain}${internalLinks.projects.tsxPlayground}`}
        description={
          <span>
            Built an innovative in-browser development environment featuring a
            WebAssembly-powered transpiler and bundler (esbuild), with support
            for React, TypeScript, and on-demand NPM module imports.
          </span>
        }
      />

      <Project
        title="Graphics Illustrations"
        link={`${internalLinks.domain}${internalLinks.projects.graphicsProjects.root}`}
        description="Graphical animations of algorithms and mathematical concepts using the Canvas API."
      />

      <Project
        title="Games"
        link={`${internalLinks.domain}${internalLinks.projects.games.root}`}
        description="Games built using the Canvas API."
      />
    </div>
  );
}

function Project(
  props: { title: string; link: string; description: ReactNode },
): JSX.Element {
  return (
    <>
      <ResumeSectionSubtitle
        className="mt-2 leading-5"
        text={
          <ResumeLink
            text={props.title}
            href={props.link}
          />
        }
      />
      <p className="text-xs leading-4">
        <span className="font-light">
          {props.description}
        </span>{" "}
        <ResumeLink
          className="font-medium italic underline"
          text="Click to visit."
          href={props.link}
        />
      </p>
    </>
  );
}
