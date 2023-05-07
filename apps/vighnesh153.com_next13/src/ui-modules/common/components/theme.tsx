'use client';

import { alpha, Box } from '@mui/material';
import { VighneshThemeProvider } from '@vighnesh153/ui';

export function AppTheme(props: { children: React.ReactNode }) {
  return (
    <VighneshThemeProvider>
      <Box
        sx={{
          '& ::selection': {
            backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.9),
            color: (theme) => theme.palette.secondary.main,
          },
        }}
      >
        {props.children}
      </Box>
    </VighneshThemeProvider>
  );
}
