import { children, createSignal, type JSX, Show } from "solid-js";
import { classes } from "@/utils/index.ts";

type PopupState = "open" | "closed";

export type PopupButton = {
  buttonClasses?: string;
  buttonStyles?: string;
  title?: string;
  popupContent: (togglePopup: (state?: PopupState) => void) => JSX.Element;
  children?: (togglePopup: (state?: PopupState) => void) => JSX.Element;
} & Pick<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export function PopupButton(props: PopupButton) {
  const [popupState, setPopupState] = createSignal<PopupState>("closed");

  const togglePopup = (state?: PopupState) => {
    setPopupState(
      state !== undefined ? state : popupState() === "open" ? "closed" : "open",
    );
  };

  const safeChildren = children(() => props.children?.(togglePopup));

  return (
    <div class="relative">
      <div class="flex flex-col">
        <button
          style={props.buttonStyles}
          class={classes(
            `w-11 h-11 grid place-items-center rounded-full border-2 border-secondary`,
            "focus-visible:outline-secondary",
            props.buttonClasses,
          )}
          onClick={() => togglePopup()}
        >
          {safeChildren()}
        </button>

        <div class="mt-1 text-secondary">
          {props.title ?? "Title"}
        </div>
      </div>
      <Show when={popupState() === "open"}>
        <div class="absolute top-16 -translate-x-1/2 z-[1000000] w-fit p-6 bg-text shadow-2xl shadow-primary rounded-lg">
          {props.popupContent(togglePopup)}
        </div>
      </Show>
    </div>
  );
}
