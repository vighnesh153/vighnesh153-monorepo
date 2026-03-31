import type { JSX } from "react";

import { classes } from "@/utils/classes";

export type AvatarProps = {
  imageLink: string;
  userInitials: string;
};

export function Avatar(props: AvatarProps): JSX.Element {
  return (
    <div className="relative w-8 aspect-square">
      <div
        className={classes(`
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
        src={props.imageLink}
        alt="logged in user"
        className={classes(`
          relative
          w-8 aspect-square rounded-full
          pointer-events-none
        `)}
      />
    </div>
  );
}
