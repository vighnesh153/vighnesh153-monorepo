import { createSignal, type JSX, onMount, Show } from "solid-js";

import type { SnackbarProps } from "@/store/snackbar.ts";
import { classes } from "@/utils/index.ts";
import { CheckIcon, CloseIcon, InfoIcon, WarnIcon } from "@/icons";

export function Snackbar(props: SnackbarProps): JSX.Element {
  const config = mapping[props.type];
  const [width, setWidth] = createSignal("100%");

  onMount(() => {
    // animating the progress bar
    setTimeout(() => {
      setWidth("0%");
    }, 1);
  });

  return (
    <div
      role="alert"
      class={classes(`
        w-80 mb-3

        rounded-md overflow-hidden
      `)}
      classList={{
        [config.textColor]: true,
        [config.iconColor]: true,
      }}
      style={{
        background: config.bgColor,
      }}
    >
      <div
        class={classes(`
          px-4 py-3

          flex items-start gap-2
        `)}
      >
        <div class="mt-1">{config.icon()}</div>
        <p class="grow">{props.message}</p>
        <Show when={props.manualDismissible}>
          <button onClick={() => props.dismiss()}>
            <CloseIcon class="mt-1 w-4 h-4" />
          </button>
        </Show>
      </div>
      <Show when={props.autoDismissible}>
        <div
          class="h-2"
          style={{
            "background-color": config.timerProgressColor,
            width: width(),
            transition: `width ${props.autoDismissTimeMillis}ms linear`,
          }}
        />
      </Show>
    </div>
  );
}

const mapping = {
  success: {
    icon: () => <CheckIcon class="w-4 h-4" />,
    bgColor: "#388e3c",
    textColor: "text-secondary",
    iconColor: "fill-secondary",
    timerProgressColor: "#87d58a",
  },
  info: {
    icon: () => <InfoIcon class="w-4 h-4" />,
    bgColor: "#0288d1",
    textColor: "text-secondary",
    iconColor: "fill-secondary",
    timerProgressColor: "#7fd7ff",
  },
  warn: {
    icon: () => <WarnIcon class="w-4 h-4" />,
    bgColor: "#f57c00",
    textColor: "text-secondary",
    iconColor: "fill-secondary",
    timerProgressColor: "#ffd89f",
  },
  error: {
    icon: () => <InfoIcon class="w-4 h-4" />,
    bgColor: "#d32f2f",
    textColor: "text-text",
    iconColor: "fill-text",
    timerProgressColor: "#ffbbbb",
  },
} satisfies Record<
  SnackbarProps["type"],
  {
    icon: () => JSX.Element;
    bgColor: string;
    textColor: string;
    iconColor: string;
    timerProgressColor: string;
  }
>;
