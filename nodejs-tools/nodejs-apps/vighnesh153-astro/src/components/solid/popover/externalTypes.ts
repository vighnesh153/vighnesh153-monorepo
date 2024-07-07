import type { JSX } from 'solid-js';

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

export type PopoverToggle = (forceToggleTo?: boolean) => void;

/**
 * Props for the Popover component.
 *
 * Future To-dos:
 * 1. Flip placement based on scrolling to keep the popover in view
 */
export type PopoverProps = {
  /**
   * Where to place the floating element relative to its reference element.
   *
   * @default 'bottom-center'
   */
  placement?: PopoverPlacement;

  /**
   * Interaction with this element triggers the popover
   */
  controlElement: (isOpen: boolean, toggle: PopoverToggle) => JSX.Element;

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
};

/**
 * Props for the Popover component.
 *
 * Future To-dos:
 * 1. Flip placement based on scrolling to keep the popover in view
 */
export type ControlledPopoverProps = PopoverProps & {
  /**
   * State to track whether the popover is open or closed.
   */
  open: boolean;

  /**
   * Callback to close the popover. Toggling of the open state should be handled by the parent.
   */
  toggle: PopoverToggle;
};
