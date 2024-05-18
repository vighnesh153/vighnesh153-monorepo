import { type ParentProps } from 'solid-js';

import { initiateLoginWithGoogle } from '@/utils/initiateLogin';
import { GoogleIcon } from '@/icons/solid/GoogleIcon';
import { classes } from '@/utils';

export type GoogleSignInButtonProps = ParentProps;

export function GoogleSignInButton() {
  return (
    <button
      onClick={initiateLoginWithGoogle}
      class={classes(`
      min-w-fit px-5 py-2 rounded-md
      flex gap-2 items-center
      bg-[dodgerblue]
      `)}
    >
      <GoogleIcon class="fill-text inline-block w-5" />
      Sign in
    </button>
  );
}
