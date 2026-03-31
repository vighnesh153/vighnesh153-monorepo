import { type ReactNode } from "react";
import { classes } from "@/utils/classes.ts";

export function ResumeAsideList(
  props: { items: string[]; asColumns?: boolean },
): ReactNode {
  return (
    <ul
      className={classes("flex flex-wrap", props.asColumns && "flex-col")}
    >
      {props.items.map((item) => (
        <li
          key={item}
          className="ml-3 pr-2 text-xs leading-4 list-disc text-secondary font-light"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
