/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSignal, onCleanup, onMount, type JSX } from 'solid-js';

import { not } from '@vighnesh153/tools-platform-independent';

import { classes } from '@/utils';
import { InfoIcon, CheckIcon, WarnIcon } from '@/icons/solid';
import type { SnackbarProps } from './SnackbarUtils';

export function Snackbar(props: SnackbarProps): JSX.Element {
  const config = mapping[props.type];

  const [timerPercent, setTimerPercent] = createSignal(100);

  onMount(() => {
    if (not(props.autoDismissible)) {
      return;
    }

    const start = Date.now();

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - start;

      if (elapsedTime > 0) {
        setTimerPercent(100 * (1 - elapsedTime / props.autoDismissTimeMillis!));
      }
      if (elapsedTime > props.autoDismissTimeMillis!) {
        clearInterval(interval);
      }
    }, 60);

    onCleanup(() => clearInterval(interval));
  });

  return (
    <div
      role="alert"
      class={classes(`
        w-80 mb-3

        rounded-md overflow-hidden
      `)}
      classList={{
        [config.textColor]: true,
        [config.iconColor]: true,
      }}
      style={{
        background: config.bgColor,
      }}
    >
      <div
        class={classes(`
          px-4 py-3

          flex items-start gap-2
        `)}
      >
        <div class="mt-1">{config.icon()}</div>
        <p>{props.message}</p>
      </div>
      <div class="h-2" style={{ 'background-color': config.timerProgressColor, width: `${timerPercent()}%` }} />
    </div>
  );
}

const mapping = {
  success: {
    icon: () => <CheckIcon class="w-4 h-4" />,
    bgColor: '#388e3c',
    textColor: 'text-secondary',
    iconColor: 'fill-secondary',
    timerProgressColor: '#87d58a',
  },
  info: {
    icon: () => <InfoIcon class="w-4 h-4" />,
    bgColor: '#0288d1',
    textColor: 'text-secondary',
    iconColor: 'fill-secondary',
    timerProgressColor: '#7fd7ff',
  },
  warn: {
    icon: () => <WarnIcon class="w-4 h-4" />,
    bgColor: '#f57c00',
    textColor: 'text-secondary',
    iconColor: 'fill-secondary',
    timerProgressColor: '#ffd89f',
  },
  error: {
    icon: () => <InfoIcon class="w-4 h-4" />,
    bgColor: '#d32f2f',
    textColor: 'text-text',
    iconColor: 'fill-text',
    timerProgressColor: '#ffbbbb',
  },
} satisfies Record<
  SnackbarProps['type'],
  {
    icon: () => JSX.Element;
    bgColor: string;
    textColor: string;
    iconColor: string;
    timerProgressColor: string;
  }
>;
