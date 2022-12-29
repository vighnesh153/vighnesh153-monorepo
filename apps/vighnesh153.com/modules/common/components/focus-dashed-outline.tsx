import React, { PropsWithChildren } from 'react';
import { Box, BoxProps } from '@vighnesh153/ui';

export function FocusDashedOutline(props: PropsWithChildren<BoxProps>) {
  return (
    <Box
      {...props}
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
