import { For, type JSX, Show } from "solid-js";

import { classes } from "@/utils";

import {
  ResumeSectionSubtitle,
  ResumeSectionTitle,
} from "./ResumeSectionTitle";
import { ResumeRalewayText } from "./ResumeRalewayText";

export function ResumeExperiencesSection(): JSX.Element {
  return (
    <div class="flex flex-col gap-2">
      <ResumeSectionTitle text="Experience" />

      <Experience
        company="Google"
        location="Bengaluru, India"
        responsibilities={[
          {
            positions: [
              { role: "Software Engineer 3", duration: "Nov 2023 - Present" },
              { role: "Software Engineer 2", duration: "July 2022 - Oct 2023" },
            ],
            summaries: [
              "Developed an Android SDK adopted by over 10 media partners, improving video content discovery and user engagement on Google TV.",
              "Led the development of the Jetpack Compose Material library for TV, providing pre-built UI components optimized for large screen devices and remote control navigation.",
              "Modernizing the Google Tv mobile app used by over 100 million users every month",
            ],
          },
        ]}
      />

      <Experience
        company="Amazon"
        location="Bengaluru, India"
        responsibilities={[
          {
            positions: [
              {
                role: "Front-End Engineer 1",
                duration: "June 2022 - July 2022",
              },
              {
                role: "Web Development Engineer 1",
                duration: "Sept 2020 - May 2022",
              },
            ],
            summaries: [
              "Led the Overhaul and modernization of the Android app submission flow on the Amazon Developer Console, optimizing the workflow for increased developer productivity.",
              'Designed and built an engaging internal portal to reinforce the "Day 1" philosophy at Amazon, driving employee participation and cultural awareness.',
              "Developed a suite of internal tools and libraries using ReactJS, TypeScript, and Java to improve efficiency and productivity across various teams.",
            ],
          },
        ]}
      />

      <Experience
        company="Smarter Codes"
        location="Pune, India"
        responsibilities={[
          {
            positions: [{
              role: "Full Stack Engineer",
              duration: "July 2020 - Sept 2020",
            }],
            summaries: [
              "Built plugins for Mattermost chat service to bridge the gap between it and RocketChat",
            ],
          },
        ]}
      />

      <Experience
        company="Tavisca Solutions"
        location="Pune, India"
        responsibilities={[
          {
            positions: [
              { role: "Software Trainee", duration: "July 2019 - Jan 2020" },
            ],
            summaries: [
              "Completed a 4-month software engineering training program, culminating in a road-trip planner project and contributing to the resolution of production-impacting issues.",
            ],
          },
        ]}
      />
    </div>
  );
}

function Experience(props: {
  company: string;
  location: string;
  responsibilities: {
    positions: { role: string; duration: string }[];
    summaries: string[];
  }[];
}): JSX.Element {
  return (
    <div>
      <div class="flex gap-2 items-center">
        <ResumeSectionSubtitle text={props.company} />
        <span class="text-sm">
          |&nbsp;&nbsp;{props.location}
        </span>
      </div>
      <For each={props.responsibilities}>
        {(responsibility) => (
          <div>
            <For each={responsibility.positions}>
              {(position) => (
                <p class="leading-5 whitespace-pre">
                  <span class="text-sm font-semibold">
                    <ResumeRalewayText>{position.role}</ResumeRalewayText>
                  </span>
                  {" | "}
                  <span class="text-xs">
                    {position.duration}
                  </span>
                </p>
              )}
            </For>
            <div class="font-light leading-4">
              <Show
                when={responsibility.summaries.length > 1}
                fallback={
                  <ExperienceSummary text={responsibility.summaries[0] ?? ""} />
                }
              >
                <ul class="ml-4">
                  <For each={responsibility.summaries}>
                    {(summary) => (
                      <li class="list-disc">
                        <ExperienceSummary text={summary} />
                      </li>
                    )}
                  </For>
                </ul>
              </Show>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}

function ExperienceSummary(props: { text: string; class?: string }) {
  return (
    <span class={classes(props.class, "text-xs leading-4 font-light")}>
      {props.text}
    </span>
  );
}
