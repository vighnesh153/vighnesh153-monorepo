import type { JSX } from "solid-js";

import { externalLinks, internalLinks, myPersonalizedEmail } from "@/utils";

import { ResumeSectionTitle } from "./ResumeSectionTitle";
import { ResumeLink } from "./ResumeLink";

export function ResumeLinksSection(props: { class?: string }): JSX.Element {
  return (
    <div class={props.class}>
      <ResumeSectionTitle text="Links" />
      <ul class="mt-1">
        <ListItem
          title="Email"
          link={`mailto:${myPersonalizedEmail}`}
          linkDisplayText={myPersonalizedEmail}
        />
        <ListItem
          title="Website"
          link={internalLinks.domain}
          linkDisplayText={internalLinks.host}
        />
        <ListItem
          title="Blog"
          link={internalLinks.domain + internalLinks.blog}
          linkDisplayText={internalLinks.host + internalLinks.blog}
        />
        <ListItem
          title="Github"
          link={externalLinks.social.github}
          linkDisplayText="github/vighnesh153"
        />
        <ListItem
          title="LinkedIn"
          link={externalLinks.social.linkedin}
          linkDisplayText="linkedin/vighnesh153"
        />
      </ul>
    </div>
  );
}

function ListItem(
  props: { title: string; linkDisplayText: string; link: string },
): JSX.Element {
  return (
    <li class="text-xs leading-tight">
      <span class="font-light">
        {props.title}://
      </span>{" "}
      <ResumeLink
        class="text-sm"
        href={props.link}
        text={props.linkDisplayText}
      />
    </li>
  );
}
