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

/**
 * Props for the Popover component.
 *
 * Future To-dos:
 * 1. Flip placement based on scrolling to keep the popover in view
 */
export type PopoverProps = ParentProps<{
  /**
   * State to track whether the popover is open or closed.
   */
  open: boolean;

  /**
   * Callback to close the popover. Toggling of the open state should be handled by the parent.
   */
  close: () => void;

  // TODO: click outside listener (make use of the close callback above)
  // TODO: add tiny-triangle to popover
  // TODO: accessibility

  /**
   * Where to place the floating element relative to its reference element.
   *
   * @default 'bottom-center'
   */
  placement?: PopoverPlacement;

  /**
   * Interaction with this element triggers the popover
   */
  controlElement: JSX.Element;

  /**
   * Content inside of popover balloon
   */
  popoverContent: JSX.Element;

  /**
   * Scrolling container, which should re-anchor the popover to the control element
   *
   * @default window
   */
  scrollElement?: JSX.Element;

  /**
   * Whether the layout is a LTR or RTL
   *
   * @default 'ltr'
   */
  layoutDirection?: PopoverLayoutDirection | null;
}>;
