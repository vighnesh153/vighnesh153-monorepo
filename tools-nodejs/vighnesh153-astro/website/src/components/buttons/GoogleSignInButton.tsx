import type { JSX } from "react";

import styles from "./GoogleSignInButton.module.css";

import { initiateLoginWithGoogle } from "@/utils/auth.ts";
import { GoogleIcon } from "@/icons/GoogleIcon.tsx";

export function GoogleSignInButton(): JSX.Element {
  return (
    <button
      onClick={initiateLoginWithGoogle}
      className={styles["btn-google-sign-in"]}
    >
      <GoogleIcon className="inline-block w-5 aspect-square" />
      Sign in
    </button>
  );
}
