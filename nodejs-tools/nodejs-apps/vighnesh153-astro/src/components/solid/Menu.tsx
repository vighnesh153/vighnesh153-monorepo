import { For } from "solid-js";

import { ListItem, type ListItemProps } from "./ListItem.tsx";
import {
  Popover,
  type PopoverPlacement,
  type PopoverProps,
} from "./popover/index.ts";

export type MenuProps = {
  items: ListItemProps[];

  controlElement: PopoverProps["controlElement"];

  placement?: PopoverPlacement;
};

export function Menu(props: MenuProps) {
  return (
    <Popover
      placement={props.placement}
      controlElement={props.controlElement}
      popoverContent={
        <ul class="list-none bg-secondary py-1">
          {
            <For each={props.items}>
              {(listItem) => <ListItem {...listItem} />}
            </For>
          }
        </ul>
      }
    />
  );
}
