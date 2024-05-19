/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  type ParentProps,
  type JSX,
  children,
  splitProps,
  onCleanup,
  Show,
  createEffect,
  createSignal,
} from 'solid-js';
import { Portal } from 'solid-js/web';

import { not } from '@vighnesh153/utils';

import { classes } from '@/utils';

export type PopoverProps = ParentProps<{
  open: boolean;

  close: () => void;

  // TODO: add alignment (top, bottom, center) and arrangement (left, right, center)
  // TODO: click outside listener

  // Interaction with this element triggers the popover
  controlElement: JSX.Element;

  // content of the popover
  popoverContent: JSX.Element;

  // Scrolling container, which should re-anchor the popover to the control element
  listenToScrollEventsFor?: JSX.Element;
}>;

export function Popover(incomingProps: PopoverProps): JSX.Element {
  const [, props] = splitProps(incomingProps, []);

  let root!: HTMLDivElement;
  let popoverContentRoot!: HTMLDivElement;

  const controlElement = children(() => props.controlElement);

  const anchorPopoverToControlElement = () => {
    const controlEl = controlElement() as HTMLElement;
    const controlElRect = controlEl.getBoundingClientRect();

    const popoverContentRootRect = popoverContentRoot.getBoundingClientRect();
    popoverContentRoot.style.top = `${controlElRect.bottom}px`;
    popoverContentRoot.style.left = `${controlElRect.right - popoverContentRootRect.width}px`;
  };

  // Attach scroll listener
  createEffect(() => {
    if (not(props.open)) {
      return;
    }

    // anchor the popover to the control element
    anchorPopoverToControlElement();

    const listenToScrollEventsForEl = (props.listenToScrollEventsFor ?? window) as HTMLElement;
    listenToScrollEventsForEl.addEventListener('scroll', anchorPopoverToControlElement);
    onCleanup(() => {
      listenToScrollEventsForEl.removeEventListener('scroll', anchorPopoverToControlElement);
    });
  });

  return (
    <div ref={root}>
      {controlElement()}
      <Portal>
        <div ref={popoverContentRoot} class={classes(`fixed z-tooltip`)}>
          <Show when={props.open}>{props.popoverContent}</Show>
        </div>
      </Portal>
    </div>
  );
}

export function PopoverPlayground() {
  const [open, setOpen] = createSignal(false);

  return (
    <Popover
      open={open()}
      close={() => setOpen(false)}
      popoverContent={<div class="w-[200px] aspect-square bg-primary text-secondary">Hello world</div>}
      controlElement={
        <button aria-expanded={`${open()}`} class="border-2" onClick={() => setOpen((oldOpen) => !oldOpen)}>
          Lol
        </button>
      }
    />
  );
}
