import { createSignal, type JSX, onMount } from "solid-js";

import { myPersonalizedEmail } from "@/utils";
import { ResumeLink } from "./ResumeLink";

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
    const day = date().getDay();
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
      <p class="pt-5 ml-auto pr-14 w-fit text-xs text-[#aaa] font-extralight">
        Snapshot Taken on {formattedDate()}
      </p>
      <h1 class="mt-2 text-center text-5xl">Vighnesh Raut</h1>
      <p class="mt-2 text-sm text-center">
        Email:{" "}
        <ResumeLink
          href={`mailto:${myPersonalizedEmail}`}
          text={myPersonalizedEmail}
        />
      </p>
      <p class="mt-0 text-center text-sm">
        <ResumeLink
          href="https://vighnesh153.dev"
          text="vighnesh153.dev"
        />
      </p>
      <hr class="mt-2 border-[#999]" />

      <div class="flex-grow flex [&>div]:pt-2 ">
        <div class="resume-column-1 border-2 border-primary basis-1/3">
          hello
        </div>
        <div class="resume-column-2 border-2 border-primary flex-grow">
          hello
        </div>
      </div>
    </div>
  );
}
