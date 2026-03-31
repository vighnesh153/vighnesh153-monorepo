import type { JSX } from "react";
import { ResumeSectionTitle } from "./ResumeSectionTitle";
import { ResumeAsideList } from "./ResumeAsideList";

export function ResumeInterestsAndHobbies(
  props: { className?: string },
): JSX.Element {
  return (
    <div className={props.className}>
      <ResumeSectionTitle text="Interests & Hobbies" />
      <ResumeAsideList
        asColumns
        items={[
          "Theoretical Mathematics",
          "Graphics Programming",
          "Compilers",
          "Performance Analysis",
          "Neuro-Science",
          "Mobile Games",
        ]}
      />
    </div>
  );
}
