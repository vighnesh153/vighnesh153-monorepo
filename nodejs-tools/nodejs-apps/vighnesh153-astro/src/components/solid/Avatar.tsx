import { type JSX } from 'solid-js';

import { classes } from '@/utils/index.ts';

export type AvatarProps = {
  imageLink: string;
  userInitials: string;
};

export function Avatar(props: AvatarProps): JSX.Element {
  return (
    <div class="relative w-8 aspect-square">
      <div
        class={classes(`
          absolute
          w-full aspect-square 
          grid place-items-center
          bg-primary text-secondary 
          rounded-full
        `)}
      >
        {props.userInitials}
      </div>
      <img
        {...props}
        src={props.imageLink}
        alt="logged in user"
        class={classes(`
          relative
          w-8 aspect-square rounded-full
          pointer-events-none
        `)}
      />
    </div>
  );
}
