import { useState, type JSX, type ReactNode, type ButtonHTMLAttributes } from "react";
import { classes } from "@/utils/classes.ts";

type PopupState = "open" | "closed";

export type PopupButtonProps = {
  buttonClasses?: string;
  buttonStyles?: React.CSSProperties;
  title?: string;
  popupContent: (togglePopup: (state?: PopupState) => void) => ReactNode;
  children?: (togglePopup: (state?: PopupState) => void) => ReactNode;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export function PopupButton(props: PopupButtonProps): JSX.Element {
  const [popupState, setPopupState] = useState<PopupState>("closed");

  const togglePopup = (state?: PopupState) => {
    setPopupState((old) =>
      state !== undefined ? state : old === "open" ? "closed" : "open",
    );
  };

  return (
    <div className="relative">
      <div className="flex flex-col">
        <button
          style={props.buttonStyles}
          className={classes(
            `w-11 h-11 grid place-items-center rounded-full border-2 border-secondary`,
            "focus-visible:outline-secondary",
            props.buttonClasses,
          )}
          onClick={() => togglePopup()}
        >
          {props.children?.(togglePopup)}
        </button>

        <div className="mt-1 text-secondary">
          {props.title ?? "Title"}
        </div>
      </div>
      {popupState === "open" && (
        <div className="absolute top-16 -translate-x-1/2 z-[1000000] w-fit p-6 bg-text shadow-2xl shadow-primary rounded-lg">
          {props.popupContent(togglePopup)}
        </div>
      )}
    </div>
  );
}
