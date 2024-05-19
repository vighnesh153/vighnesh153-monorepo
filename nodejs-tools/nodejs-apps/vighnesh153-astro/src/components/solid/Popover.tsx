/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  type ParentProps,
  type JSX,
  children,
  splitProps,
  onMount,
  onCleanup,
  createSignal,
  Show,
  createEffect,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { classes } from '@/utils';
import { not } from '@vighnesh153/utils';

export type PopoverProps = ParentProps<{
  // Interaction with this element triggers the popover
  controlElement: JSX.Element;

  // content of the popover
  popoverContent: JSX.Element;

  // Scrolling container, which should re-anchor the popover to the control element
  listenToScrollEventsFor?: JSX.Element;
}>;

export function Popover(incomingProps: PopoverProps): JSX.Element {
  const [, props] = splitProps(incomingProps, []);

  const [open, setOpen] = createSignal(false);

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

  createEffect(() => {
    const controlEl = controlElement() as HTMLElement;
    const isOpen = open();
    controlEl.ariaExpanded = `${isOpen}`;
    if (isOpen) {
      anchorPopoverToControlElement();
    }
  });

  onMount(() => {
    const el = controlElement() as HTMLElement;
    el.addEventListener('click', () => {
      setOpen((oldOpen) => not(oldOpen));
    });

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
        <div
          ref={popoverContentRoot}
          class={classes(
            `fixed z-tooltip `
            //'transition-[top]',
          )}
        >
          <Show when={open()}>{props.popoverContent}</Show>
        </div>
      </Portal>
    </div>
  );
}

export function PopoverPlayground() {
  return (
    <Popover
      popoverContent={<div class="w-[200px] aspect-square bg-primary text-secondary">Hello world</div>}
      controlElement={<button class="border-2">Lol</button>}
    />
  );
}
