/* eslint-disable @typescript-eslint/no-use-before-define */
import { type JSX, children, splitProps, onCleanup, Show, createEffect, createSignal, mergeProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import { not } from '@vighnesh153/utils';

import { classes } from '@/utils';
import type { PopoverLayoutDirection, PopoverPlacement, PopoverProps } from './externalTypes';
import { updatePopoverPlacementBasedOnPlacement } from './popover-placement';

export function Popover(incomingProps: PopoverProps): JSX.Element {
  const [, props] = splitProps(
    mergeProps<Partial<PopoverProps>[]>(
      { placement: 'bottom-end', layoutDirection: null },
      incomingProps
    ) as Required<PopoverProps>,
    []
  );

  let root!: HTMLDivElement;
  let popoverContentRoot!: HTMLDivElement;

  const controlElement = children(() => props.controlElement);

  const anchorPopoverToControlElement = (placement: PopoverPlacement, layoutDirection: PopoverLayoutDirection) => {
    updatePopoverPlacementBasedOnPlacement(
      placement,
      layoutDirection,
      popoverContentRoot,
      controlElement() as HTMLElement
    );
  };

  // Attach scroll listener
  createEffect(() => {
    if (not(props.open)) {
      return;
    }

    const layoutDirection =
      props.layoutDirection ?? (document.documentElement.getAttribute('dir') as PopoverLayoutDirection) ?? 'ltr';

    // anchor the popover to the control element
    anchorPopoverToControlElement(props.placement, layoutDirection);

    function scrollListener() {
      anchorPopoverToControlElement(props.placement, layoutDirection);
    }

    const scrollElement = (props.scrollElement ?? window) as HTMLElement;
    scrollElement.addEventListener('scroll', scrollListener);
    onCleanup(() => {
      scrollElement.removeEventListener('scroll', scrollListener);
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

export function PopoverPlayground(props: { placement: PopoverPlacement }) {
  const [open, setOpen] = createSignal(false);

  return (
    <Popover
      open={open()}
      close={() => setOpen(false)}
      popoverContent={<div class="w-[200px] aspect-square bg-primary text-secondary">Hello world</div>}
      placement={props.placement}
      controlElement={
        <button aria-expanded={`${open()}`} class="border-2" onClick={() => setOpen((oldOpen) => !oldOpen)}>
          Lol
        </button>
      }
    />
  );
}
