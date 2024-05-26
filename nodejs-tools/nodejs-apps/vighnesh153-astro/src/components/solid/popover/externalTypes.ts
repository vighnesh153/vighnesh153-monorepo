import type { ParentProps, JSX } from 'solid-js';

export type PopoverPlacement =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'right-start'
  | 'right-center'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'
  | 'left-start'
  | 'left-center'
  | 'left-end';

export type PopoverLayoutDirection = 'ltr' | 'rtl';

export type PopoverProps = ParentProps<{
  open: boolean;

  close: () => void;

  // TODO: click outside listener
  // TODO: smart alignment based on scrolling

  placement?: PopoverPlacement;

  // Interaction with this element triggers the popover
  controlElement: JSX.Element;

  // content of the popover
  popoverContent: JSX.Element;

  // Scrolling container, which should re-anchor the popover to the control element
  scrollElement?: JSX.Element;

  layoutDirection?: PopoverLayoutDirection | null;
}>;
