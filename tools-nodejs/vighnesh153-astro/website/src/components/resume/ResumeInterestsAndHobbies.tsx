import { type JSX } from "solid-js";
import { ResumeSectionTitle } from "./ResumeSectionTitle";
import { ResumeAsideList } from "./ResumeAsideList";

export function ResumeInterestsAndHobbies(
  props: { class?: string },
): JSX.Element {
  return (
    <div class={props.class}>
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
