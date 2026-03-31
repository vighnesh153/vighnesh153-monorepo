import type { JSX } from "react";

import { internalLinks } from "@/utils/content/links.ts";
import { myPersonalizedEmail } from "@/utils/content/emails.ts";
import { ResumeLink } from "./ResumeLink";
import { ResumeEducationSection } from "./ResumeEducationSection";
import { ResumeLinksSection } from "./ResumeLinksSection";
import { ResumeSkillsSection } from "./ResumeSkillsSection";
import { ResumeInterestsAndHobbies } from "./ResumeInterestsAndHobbies";
import { ResumeProjectsSection } from "./ResumeProjectsSection";
import { ResumeExperiencesSection } from "./ResumeExperiencesSection";

export function ResumeContainer(props: { snapshotDate: string }): JSX.Element {
  return (
    <div className="w-full h-full bg-[#f5e5e5] text-secondary flex flex-col">
      {/* Header */}
      <p className="pt-5 ml-auto pr-14 w-fit text-xs font-extralight">
        <span className="text-[#333333]">
          Snapshot Taken on {props.snapshotDate}
        </span>
      </p>
      <h1 className="mt-2 text-center text-5xl">
        Vighnesh Raut
      </h1>
      <p className="mt-2 text-center text-sm">
        <span className="font-thin">Website:</span>{" "}
        <ResumeLink
          href={internalLinks.domain}
          text={internalLinks.host}
        />
      </p>
      <p className="text-sm text-center leading-3">
        <span className="font-thin">Email:</span>{" "}
        <ResumeLink
          href={`mailto:${myPersonalizedEmail}`}
          text={myPersonalizedEmail}
        />
      </p>
      <hr className="mt-2 border-[#999]" />

      <div className="grow flex [&>div]:pt-6">
        <div className="pl-10 basis-4/12">
          <ResumeEducationSection />
          <ResumeLinksSection className="mt-8" />
          <ResumeSkillsSection className="mt-8" />
          <ResumeInterestsAndHobbies className="mt-8" />
        </div>
        <div className="px-6 basis-8/12">
          <ResumeExperiencesSection />
          <ResumeProjectsSection className="mt-6" />
        </div>
      </div>
    </div>
  );
}
