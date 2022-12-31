import React, { PropsWithChildren } from 'react';
import { Box, BoxProps } from '@mui/material';
import clsx from 'clsx';

export function FocusDashedOutline(props: PropsWithChildren<BoxProps>) {
  return (
    <Box
      {...props}
      className={clsx(props.className, 'dashed-outline-on-focus')}
      sx={{
        ...(props.sx ?? {}),
        '*:focus-visible': {
          outlineWidth: 3,
          outlineStyle: 'dashed',
          outlineColor: 'currentColor',
          outlineOffset: '0.5rem',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ...(props.sx?.['*:focus-visible'] ?? {}),
        },
      }}
    />
  );
}
