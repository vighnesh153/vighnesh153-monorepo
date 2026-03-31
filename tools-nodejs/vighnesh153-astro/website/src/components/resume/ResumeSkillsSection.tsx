import type { JSX } from "react";
import {
  ResumeSectionSubtitle,
  ResumeSectionTitle,
} from "./ResumeSectionTitle";
import { ResumeAsideList } from "./ResumeAsideList";

export function ResumeSkillsSection(props: { className?: string }): JSX.Element {
  return (
    <div className={props.className}>
      <ResumeSectionTitle text="Skills" />
      <ResumeSectionSubtitle className="leading-5" text="Languages" />
      <ResumeAsideList
        items={["Typescript", "Kotlin", "Javascript", "Golang", "Java"]}
      />
      <ResumeSectionSubtitle className="leading-5 mt-2" text="Frameworks | Tools" />
      <ResumeAsideList
        items={[
          "Astro.js",
          "React.js",
          "Android",
          "Jetpack Compose",
          "Next.js",
          "Svelte.js",
          "Solid.js",
          "Tailwind CSS",
          "SST",
        ]}
      />
      <ResumeSectionSubtitle className="leading-5 mt-2" text="Cloud Services" />
      <ResumeAsideList
        items={[
          "AWS",
          "Firebase",
          "Cloudflare",
          "Mongo DB Atlas",
          "Squarespace Domains",
          "Namecheap",
        ]}
      />
    </div>
  );
}
