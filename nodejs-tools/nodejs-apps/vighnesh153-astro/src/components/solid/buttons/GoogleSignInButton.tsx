import { type ParentProps } from 'solid-js';

import { classes, initiateLoginWithGoogle } from '@/utils';
import { GoogleIcon } from '@/icons/solid/GoogleIcon';

export type GoogleSignInButtonProps = ParentProps;

export function GoogleSignInButton() {
  return (
    <button
      onClick={initiateLoginWithGoogle}
      class={classes(`
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
