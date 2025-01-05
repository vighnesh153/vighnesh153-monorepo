import { type JSX } from "solid-js";
import {
  ResumeSectionSubtitle,
  ResumeSectionTitle,
} from "./ResumeSectionTitle";
import { ResumeAsideList } from "./ResumeAsideList";

export function ResumeSkillsSection(props: { class?: string }): JSX.Element {
  return (
    <div class={props.class}>
      <ResumeSectionTitle text="Skills" />
      <ResumeSectionSubtitle class="leading-5" text="Languages" />
      <ResumeAsideList
        items={["Typescript", "Kotlin", "Javascript", "Golang", "Java"]}
      />
      <ResumeSectionSubtitle class="leading-5 mt-2" text="Frameworks | Tools" />
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
      <ResumeSectionSubtitle class="leading-5 mt-2" text="Cloud Services" />
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
