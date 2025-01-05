import type { JSX } from "solid-js";
import {
  ResumeSectionSubtitle,
  ResumeSectionTitle,
} from "./ResumeSectionTitle";
import { ResumeLink } from "./ResumeLink";
import { internalLinks } from "@/utils";

export function ResumeProjectsSection(props: { class?: string }): JSX.Element {
  return (
    <div class={props.class}>
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
  props: { title: string; link: string; description: JSX.Element },
): JSX.Element {
  return (
    <>
      <ResumeSectionSubtitle
        class="mt-2 leading-5"
        text={
          <ResumeLink
            text={props.title}
            href={props.link}
          />
        }
      />
      <p class="text-xs leading-4">
        <span class="font-light">
          {props.description}
        </span>{" "}
        <ResumeLink
          class="font-medium italic underline"
          text="Click to visit."
          href={props.link}
        />
      </p>
    </>
  );
}
