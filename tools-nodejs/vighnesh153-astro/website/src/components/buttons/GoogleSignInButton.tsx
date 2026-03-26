import type { JSX } from "react";

import { initiateLoginWithGoogle } from "@/utils/auth.ts";
import { classes } from "@/utils/classes.ts";
import { GoogleIcon } from "@/icons/GoogleIcon.tsx";

export function GoogleSignInButton(): JSX.Element {
  return (
    <button
      onClick={initiateLoginWithGoogle}
      className={classes(`
      min-w-fit px-5 py-2 rounded-md
      flex gap-2 items-center
      bg-text
      text-secondary
      `)}
    >
      <GoogleIcon class="inline-block w-5 aspect-square" />
      Sign in
    </button>
  );
}
