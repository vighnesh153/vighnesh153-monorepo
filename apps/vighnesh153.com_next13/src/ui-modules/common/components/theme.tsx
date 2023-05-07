'use client';

import NextLink from 'next/link';
import { alpha, Box, createTheme } from '@mui/material';

import { theme, VighneshThemeProvider } from '@vighnesh153/ui';

const appTheme = createTheme({
  ...theme,
  components: {
    ...theme.components,
    MuiLink: {
      ...theme.components?.MuiLink,
      defaultProps: {
        ...theme.components?.MuiLink?.defaultProps,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        component: NextLink,
      },
    },
  },
});

export function AppTheme(props: { children: React.ReactNode }) {
  return (
    <VighneshThemeProvider theme={appTheme}>
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
