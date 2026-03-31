import type { JSX } from "react";
import { classes } from "@/utils/classes";

export type ListItemProps = {
  text: string;
  onClick: () => void;

  leadingContent?: JSX.Element;
  trailingContent?: JSX.Element;
};

export function ListItem(props: ListItemProps): JSX.Element {
  return (
    <li
      className={classes(
        `w-full px-6 py-2 
      bg-secondary text-text 
      flex gap-1

      hover:bg-background hover:text-accent
      `,
      )}
      role="button"
      onClick={props.onClick}
    >
      {props.leadingContent}
      <div className="grow">{props.text}</div>
      {props.leadingContent}
    </li>
  );
}
