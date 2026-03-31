import type { JSX } from "react";

import { externalLinks, internalLinks } from "@/utils/content/links.ts";
import { myPersonalizedEmail } from "@/utils/content/emails.ts";

import { ResumeSectionTitle } from "./ResumeSectionTitle";
import { ResumeLink } from "./ResumeLink";

export function ResumeLinksSection(props: { className?: string }): JSX.Element {
  return (
    <div className={props.className}>
      <ResumeSectionTitle text="Links" />
      <ul className="mt-1">
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
    <li className="text-xs leading-tight">
      <span className="font-light">
        {props.title}://
      </span>{" "}
      <ResumeLink
        className="text-sm"
        href={props.link}
        text={props.linkDisplayText}
      />
    </li>
  );
}
