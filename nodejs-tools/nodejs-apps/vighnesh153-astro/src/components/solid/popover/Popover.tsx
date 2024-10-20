/* eslint-disable @typescript-eslint/no-use-before-define */
import { type JSX, children, splitProps, onCleanup, Show, createEffect, createSignal, mergeProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import { not } from '@vighnesh153/tools';

import { classes } from '@/utils/index.ts';
import styles from './popover.module.scss';

import { clickOutside } from '../clickOutside.ts';
import type {
  PopoverLayoutDirection,
  PopoverPlacement,
  PopoverProps,
  ControlledPopoverProps,
  PopoverToggle,
} from './externalTypes.ts';
import {
  computeFlexClassesForPopoverContentRootBasedOnPlacement,
  updatePopoverPlacementBasedOnPlacement,
} from './popover-placement.ts';

declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface Directives {
      clickOutside: ReturnType<Parameters<typeof clickOutside>[1]>;
    }
  }
}

export function ControlledPopover(incomingProps: ControlledPopoverProps): JSX.Element {
  const [, props] = splitProps(
    mergeProps<Partial<ControlledPopoverProps>[]>(
      { placement: 'bottom-center' },
      incomingProps
    ) as Required<ControlledPopoverProps>,
    []
  );

  let root!: HTMLDivElement;
  let popoverContentRoot!: HTMLDivElement;

  const controlElement = children(() => props.controlElement(props.open, props.toggle));
  const [popoverBgColor, setPopoverBgColor] = createSignal('transparent');
  const [layoutDirectionSignal, setLayoutDirectionSignal] = createSignal<PopoverLayoutDirection>('ltr');

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

    const layoutDirection = (document.documentElement.getAttribute('dir') as PopoverLayoutDirection) ?? 'ltr';
    setLayoutDirectionSignal(layoutDirection);

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
            ${computeFlexClassesForPopoverContentRootBasedOnPlacement(props.placement, layoutDirectionSignal())}
            ${props.open ? 'before:inline-block' : 'before:hidden'}
            `
          )}
          style={{
            '--triangle-size': '10px',
            '--triangle-color': popoverBgColor(),
          }}
          use:clickOutside={{
            ignoreElements: [controlElement() as HTMLElement],
            clickOutsideCallback: () => props.toggle(false),
          }}
        >
          <Show when={props.open}>{props.popoverContent}</Show>
        </div>
      </Portal>
    </div>
  );
}

export function Popover(props: PopoverProps) {
  const [open, setOpen] = createSignal(false);

  const toggle: PopoverToggle = (forceToggleValue) => {
    if (forceToggleValue === undefined) {
      setOpen((o) => not(o));
    } else {
      setOpen(forceToggleValue);
    }
  };

  return <ControlledPopover open={open()} toggle={toggle} {...props} />;
}

export function PopoverPlayground(props: { placement?: PopoverPlacement; text: string }) {
  return (
    <Popover
      {...props}
      popoverContent={
        <div class="w-[200px] aspect-square bg-primary text-secondary">
          Hello World
          <div>
            <button>First</button>
            <button>Second</button>
          </div>
        </div>
      }
      controlElement={(isOpen, toggle) => (
        <button aria-expanded={`${isOpen}`} class="border-2 min-w-40" onClick={() => toggle()}>
          {props.text}
        </button>
      )}
    />
  );
}
