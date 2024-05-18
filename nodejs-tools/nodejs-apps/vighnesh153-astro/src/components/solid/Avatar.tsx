import { splitProps, type JSX } from 'solid-js';

import { classes } from '@/utils';

export type AvatarProps = {
  imageLink: string;
  userInitials: string;
} & Omit<JSX.ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export function Avatar(incomingProps: AvatarProps): JSX.Element {
  const [local, props] = splitProps(incomingProps, ['imageLink', 'userInitials']);
  return (
    <img
      {...props}
      src={local.imageLink}
      class={classes(`
      w-[20px] aspect-square rounded-full
    `)}
    />
  );
}
