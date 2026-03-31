import { useEffect, useState, type JSX } from "react";

import type { SnackbarProps } from "@/store/snackbar.ts";
import { classes } from "@/utils/classes.ts";
import { CheckIcon, CloseIcon, InfoIcon, WarnIcon } from "@/icons";

export function Snackbar(props: SnackbarProps): JSX.Element {
  const config = mapping[props.type];
  const [width, setWidth] = useState("100%");

  useEffect(() => {
    // animating the progress bar
    const timeout = setTimeout(() => {
      setWidth("0%");
    }, 1);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      role="alert"
      className={classes(
        `w-80 mb-3 rounded-md overflow-hidden`,
        config.textColor,
        config.iconColor,
      )}
      style={{
        background: config.bgColor,
      }}
    >
      <div
        className={classes(`
          px-4 py-3

          flex items-start gap-2
        `)}
      >
        <div className="mt-1">{config.icon()}</div>
        <p className="grow">{props.message}</p>
        {props.manualDismissible && (
          <button onClick={() => props.dismiss()}>
            <CloseIcon className="mt-1 w-4 h-4" />
          </button>
        )}
      </div>
      {props.autoDismissible && (
        <div
          className="h-2"
          style={{
            backgroundColor: config.timerProgressColor,
            width: width,
            transition: `width ${props.autoDismissTimeMillis}ms linear`,
          }}
        />
      )}
    </div>
  );
}

const mapping = {
  success: {
    icon: () => <CheckIcon className="w-4 h-4" />,
    bgColor: "#388e3c",
    textColor: "text-secondary",
    iconColor: "fill-secondary",
    timerProgressColor: "#87d58a",
  },
  info: {
    icon: () => <InfoIcon className="w-4 h-4" />,
    bgColor: "#0288d1",
    textColor: "text-secondary",
    iconColor: "fill-secondary",
    timerProgressColor: "#7fd7ff",
  },
  warn: {
    icon: () => <WarnIcon className="w-4 h-4" />,
    bgColor: "#f57c00",
    textColor: "text-secondary",
    iconColor: "fill-secondary",
    timerProgressColor: "#ffd89f",
  },
  error: {
    icon: () => <InfoIcon className="w-4 h-4" />,
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
