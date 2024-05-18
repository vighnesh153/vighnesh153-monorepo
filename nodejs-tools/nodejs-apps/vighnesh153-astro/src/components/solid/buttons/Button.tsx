import { children, mergeProps, splitProps, type JSX, type ParentProps } from 'solid-js';

import { classes } from '@/utils';

export type ButtonProps = ParentProps<{
  variant?: 'primary' | 'secondary';
}> &
  JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(incomingProps: ButtonProps): JSX.Element {
  const [local, buttonProps] = splitProps(mergeProps<ButtonProps[]>({ variant: 'secondary' }, incomingProps), [
    'variant',
    'class',
    'children',
  ]);
  const c = children(() => local.children);
  return (
    <button {...buttonProps} class={classes(local.class, `${local.variant}-button`)}>
      {c()}
    </button>
  );
}
