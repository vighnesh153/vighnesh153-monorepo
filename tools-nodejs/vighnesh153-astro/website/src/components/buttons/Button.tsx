import type { ButtonHTMLAttributes, JSX } from "react";

import { classes } from "@/utils/classes";

export type ButtonProps =
  & {
    variant?: "primary" | "secondary";
  }
  & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "secondary",
  ...props
}: ButtonProps): JSX.Element {
  if (variant == "primary") {
    return <PrimaryButton {...props} />;
  }
  if (variant == "secondary") {
    return <SecondaryButton {...props} />;
  }

  return <button {...props} />;
}

function PrimaryButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
): JSX.Element {
  return (
    <button
      {...props}
      className={classes(
        getPrimaryButtonClasses(),
        props.className,
      )}
    />
  );
}

function SecondaryButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
): JSX.Element {
  return (
    <button
      {...props}
      className={classes(
        getSecondaryButtonClasses(),
        props.className,
      )}
    />
  );
}

function getBaseButtonClasses() {
  return `
          py-[0.75em] px-[2em]
          inline-block

          border-none

          rounded-xl
          transition-shadow
          duration-200
          ease-in-out
          text-base
          text-center
          cursor-pointer
          uppercase

          hover:shadow-2xl hover:shadow-primary
          focus-visible:shadow-2xl focus-visible:shadow-primary
      `;
}

export function getPrimaryButtonClasses(): string {
  return classes(
    getBaseButtonClasses(),
    `
    bg-primary
    text-secondary`,
  );
}

export function getSecondaryButtonClasses(): string {
  return classes(
    getBaseButtonClasses(),
    `
    bg-secondary
    text-text
    shadow-primary`,
  );
}
