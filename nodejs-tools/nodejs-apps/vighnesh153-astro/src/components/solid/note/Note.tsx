/* eslint-disable @typescript-eslint/no-use-before-define */
import type { JSX } from 'solid-js';

import { classes } from '@/utils';
import { InfoIcon, CheckIcon, WarnIcon } from '@/icons/solid';

export type NoteType = 'info' | 'warn' | 'success' | 'error';

export type NoteProps = {
  type: NoteType;
  children: JSX.Element;
  title?: string;
};

export function Note({ type = 'info', children, title = mappings[type].defaultTitle }: NoteProps) {
  const mapping = mappings[type];
  return (
    <div>
      <div
        class={classes(
          `
          px-3 py-1
          w-fit
          
          rounded-t-lg
          flex items-center gap-2

          text-sm
        `,
          mapping.titleClasses
        )}
        style={{
          'background-color': mapping.majorColor,
        }}
      >
        {mapping.icon()} {title}
      </div>
      <blockquote
        class={classes(`
        py-2 px-4

        block

        rounded-lg
        rounded-tl-none
        border-2

        before:content-[]
      `)}
        style={{
          'border-color': mapping.majorColor,
          'background-color': mapping.bgColor,
        }}
      >
        {children}
      </blockquote>
    </div>
  );
}

const mappings = {
  success: {
    icon: () => <CheckIcon class="w-4 h-4" />,
    majorColor: '#388e3c',
    bgColor: '#87d58a30',
    defaultTitle: 'Success',
    titleClasses: 'text-secondary fill-secondary',
  },
  info: {
    icon: () => <InfoIcon class="w-4 h-4" />,
    majorColor: '#0288d1',
    bgColor: '#7fd7ff30',
    defaultTitle: 'Note',
    titleClasses: 'text-secondary fill-secondary',
  },
  warn: {
    icon: () => <WarnIcon class="w-4 h-4" />,
    majorColor: '#f57c00',
    bgColor: '#ffd89f30',
    defaultTitle: 'Warn',
    titleClasses: 'text-secondary fill-secondary',
  },
  error: {
    icon: () => <InfoIcon class="w-4 h-4" />,
    majorColor: '#d32f2f',
    bgColor: '#ffbbbb30',
    defaultTitle: 'Error',
    titleClasses: 'text-text fill-text',
  },
} satisfies Record<
  NoteType,
  {
    icon: () => JSX.Element;
    majorColor: string;
    bgColor: string;
    defaultTitle: string;
    titleClasses: string;
  }
>;
