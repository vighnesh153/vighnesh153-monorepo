import { For, type JSX } from "solid-js";

export function ResumeAsideList(
  props: { items: string[]; asColumns?: boolean },
): JSX.Element {
  return (
    <ul
      class="flex flex-wrap"
      classList={{
        "flex-col": props.asColumns,
      }}
    >
      <For each={props.items}>
        {(item) => (
          <li class="ml-3 pr-2 text-xs leading-4 list-disc text-secondary font-light">
            {item}
          </li>
        )}
      </For>
    </ul>
  );
}
