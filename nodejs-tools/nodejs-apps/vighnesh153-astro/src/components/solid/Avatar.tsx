import { type JSX } from 'solid-js';

import { classes } from '@/utils';

export type AvatarProps = {
  imageLink: string;
  userInitials: string;
};

export function Avatar(props: AvatarProps): JSX.Element {
  return (
    // TODO: add user initials as background
    <img
      {...props}
      src={props.imageLink}
      alt="logged in user"
      class={classes(`
      w-8 aspect-square rounded-full
      pointer-events-none
    `)}
    />
  );
}
