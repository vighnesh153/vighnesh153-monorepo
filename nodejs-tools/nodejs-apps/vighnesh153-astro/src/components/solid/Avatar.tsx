import { type JSX } from 'solid-js';

import { classes } from '@/utils';

export type AvatarProps = {
  imageLink: string;
  userInitials: string;
  onClick: () => void;
};

export function Avatar(props: AvatarProps): JSX.Element {
  return (
    // TODO: add user initials as background
    <button type="button" onClick={props.onClick}>
      <img
        {...props}
        src={props.imageLink}
        alt="logged in user"
        class={classes(`
          w-[20px] aspect-square rounded-full
        `)}
      />
    </button>
  );
}
