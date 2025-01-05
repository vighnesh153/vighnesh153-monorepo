import { createSignal, type JSX, onMount } from "solid-js";

import { internalLinks, myPersonalizedEmail } from "@/utils";
import { ResumeLink } from "./ResumeLink";
import { ResumeEducationSection } from "./ResumeEducationSection";
import { ResumeLinksSection } from "./ResumeLinksSection";
import { ResumeSkillsSection } from "./ResumeSkillsSection";
import { ResumeInterestsAndHobbies } from "./ResumeInterestsAndHobbies";
import { ResumeProjectsSection } from "./ResumeProjectsSection";
import { ResumeExperiencesSection } from "./ResumeExperiencesSection";

const monthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "short",
});
const ordinalSuffixes = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
]);
const ordinalFormatter = new Intl.PluralRules("en-US", { type: "ordinal" });

export function ResumeContainer(): JSX.Element {
  const [date, setDate] = createSignal(new Date());

  const formattedDate = () => {
    const day = date().getDate();
    const ordinal = ordinalSuffixes.get(ordinalFormatter.select(day));
    const month = monthFormatter.format(date());
    const year = date().getFullYear();

    return `${day}${ordinal} ${month} ${year}`;
  };

  onMount(() => {
    setDate(new Date());
  });

  return (
    <div class="w-full h-full bg-[#f5e5e5] text-secondary flex flex-col">
      {/* Header */}
      <p class="pt-5 ml-auto pr-14 w-fit text-xs font-extralight">
        <span class="text-[#333333]">
          Snapshot Taken on {formattedDate()}
        </span>
      </p>
      <h1 class="mt-2 text-center text-5xl">
        Vighnesh Raut
      </h1>
      <p class="mt-2 text-center text-sm">
        <span class="font-thin">Website:</span>{" "}
        <ResumeLink
          href={internalLinks.domain}
          text={internalLinks.host}
        />
      </p>
      <p class="text-sm text-center leading-3">
        <span class="font-thin">Email:</span>{" "}
        <ResumeLink
          href={`mailto:${myPersonalizedEmail}`}
          text={myPersonalizedEmail}
        />
      </p>
      <hr class="mt-2 border-[#999]" />

      <div class="flex-grow flex [&>div]:pt-6">
        <div class="pl-10 basis-4/12">
          <ResumeEducationSection />
          <ResumeLinksSection class="mt-8" />
          <ResumeSkillsSection class="mt-8" />
          <ResumeInterestsAndHobbies class="mt-8" />
        </div>
        <div class="px-6 basis-8/12">
          <ResumeExperiencesSection />
          <ResumeProjectsSection class="mt-8" />
        </div>
      </div>
    </div>
  );
}
