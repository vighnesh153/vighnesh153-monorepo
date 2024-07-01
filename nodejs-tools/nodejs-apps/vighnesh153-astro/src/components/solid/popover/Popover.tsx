/* eslint-disable @typescript-eslint/no-use-before-define */
import { type JSX, children, splitProps, onCleanup, Show, createEffect, createSignal, mergeProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import { not } from '@vighnesh153/utils';

import { classes } from '@/utils';
import styles from './popover.module.scss';

import { clickOutside } from '../clickOutside';
import type { PopoverLayoutDirection, PopoverPlacement, PopoverProps } from './externalTypes';
import {
  computeFlexClassesForPopoverContentRootBasedOnPlacement,
  updatePopoverPlacementBasedOnPlacement,
} from './popover-placement';

declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface Directives {
      clickOutside: ReturnType<Parameters<typeof clickOutside>[1]>;
    }
  }
}

export function Popover(incomingProps: PopoverProps): JSX.Element {
  const [, props] = splitProps(
    mergeProps<Partial<PopoverProps>[]>(
      { placement: 'bottom-center', layoutDirection: null },
      incomingProps
    ) as Required<PopoverProps>,
    []
  );

  let root!: HTMLDivElement;
  let popoverContentRoot!: HTMLDivElement;

  const controlElement = children(() => props.controlElement);
  const [popoverBgColor, setPopoverBgColor] = createSignal('transparent');

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

    const { backgroundColor } = getComputedStyle(popoverContentRoot.children[0] as HTMLElement);
    setPopoverBgColor(backgroundColor);

    const layoutDirection =
      props.layoutDirection ?? (document.documentElement.getAttribute('dir') as PopoverLayoutDirection) ?? 'ltr';

    // anchor the popover to the control element
    anchorPopoverToControlElement(props.placement, layoutDirection);

    function scrollElementEventListener() {
      anchorPopoverToControlElement(props.placement, layoutDirection);
    }

    const scrollElement = (props.scrollElement ?? window) as HTMLElement;
    scrollElement.addEventListener('scroll', scrollElementEventListener);
    onCleanup(() => {
      scrollElement.removeEventListener('scroll', scrollElementEventListener);
    });

    scrollElement.addEventListener('resize', scrollElementEventListener);
    onCleanup(() => {
      scrollElement.removeEventListener('resize', scrollElementEventListener);
    });
  });

  return (
    <div ref={root}>
      {controlElement()}
      <Portal>
        <div
          ref={popoverContentRoot}
          role={props.open ? 'tooltip' : 'none'}
          data-testid="popover-content-root"
          class={classes(
            `${styles['popover-content-root']}
            ${styles[`popover-placement-${props.placement.split('-')[0]}`]}

            fixed z-tooltip
            flex 
            ${computeFlexClassesForPopoverContentRootBasedOnPlacement(props.placement)}
            ${props.open ? 'before:inline-block' : 'before:hidden'}
            `
          )}
          style={{
            '--triangle-size': '10px',
            '--triangle-color': popoverBgColor(),
          }}
          use:clickOutside={{ ignoreElements: [controlElement() as HTMLElement], clickOutsideCallback: props.close }}
        >
          <Show when={props.open}>{props.popoverContent}</Show>
        </div>
      </Portal>
    </div>
  );
}

export function PopoverPlayground(props: { placement?: PopoverPlacement; text: string }) {
  const [open, setOpen] = createSignal(false);

  return (
    <Popover
      {...props}
      open={open()}
      close={() => setOpen(false)}
      popoverContent={
        <div class="w-[200px] aspect-square bg-primary text-secondary">
          Hello World
          <div>
            <button>First</button>
            <button>Second</button>
          </div>
        </div>
      }
      controlElement={
        <button
          aria-expanded={`${open()}`}
          class="border-2 min-w-40"
          onClick={() => setOpen((oldOpen) => not(oldOpen))}
        >
          {props.text}
        </button>
      }
    />
  );
}
