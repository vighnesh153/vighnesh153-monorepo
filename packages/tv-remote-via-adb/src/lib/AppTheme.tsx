'use client';

import { alpha, Box } from '@mui/material';

import { VighneshThemeProvider, theme } from '@vighnesh153/ui';

export const bodyBgColor = theme.palette.primary.dark;

export function AppTheme(props: { children: React.ReactNode }) {
  return (
    <VighneshThemeProvider>
      <Box
        sx={{
          '& ::selection': {
            backgroundColor: (t) => alpha(t.palette.primary.light, 0.9),
            color: (t) => t.palette.secondary.main,
          },
        }}
      >
        {props.children}
      </Box>
    </VighneshThemeProvider>
  );
}
