import type { JSX } from "solid-js";

import {
  ResumeSectionSubtitle,
  ResumeSectionTitle,
} from "./ResumeSectionTitle";
import { ResumeRalewayText } from "./ResumeRalewayText";

export function ResumeEducationSection(): JSX.Element {
  return (
    <div>
      <ResumeSectionTitle text="Education" />
      <ResumeSectionSubtitle class="leading-5" text="BMSIT" />
      <h4 class="mt-0 leading-tight text-xs uppercase font-semibold">
        <ResumeRalewayText>
          B.E. in Computer Science
        </ResumeRalewayText>
      </h4>
      <p class="text-xs leading-4 font-light">
        August 2015 - June 2019<br />Bengaluru, Karnataka
      </p>
    </div>
  );
}
