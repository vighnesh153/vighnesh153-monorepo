import { classes } from '@/utils';
import type { JSX } from 'solid-js';

export type ListItemProps = {
  text: string;
  onClick: () => void;

  leadingContent?: JSX.Element;
  trailingContent?: JSX.Element;
};

export function ListItem(props: ListItemProps) {
  return (
    <li
      class={classes(
        `w-full px-6 py-2 
      bg-secondary text-text 
      flex gap-1

      hover:bg-background hover:text-accent
      `
      )}
      role="button"
      onClick={props.onClick}
    >
      {props.leadingContent}
      <div class="flex-grow">{props.text}</div>
      {props.leadingContent}
    </li>
  );
}
