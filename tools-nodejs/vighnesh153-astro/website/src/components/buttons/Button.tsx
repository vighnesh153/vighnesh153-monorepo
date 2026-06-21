import { type ButtonHTMLAttributes, type JSX } from "react";

import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

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
      className={`${styles.btn} ${styles["btn-primary"]} ${props.className}`}
    />
  );
}

function SecondaryButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
): JSX.Element {
  return (
    <button
      {...props}
      className={`${styles.btn} ${styles["btn-secondary"]} ${props.className}`}
    />
  );
}
