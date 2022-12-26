import React, { PropsWithChildren } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(166, 100%, 70%)',
    },
    secondary: {
      main: 'hsl(216, 65%, 11%)',
      light: 'hsl(218, 58%, 16%)',
      dark: 'hsl(218, 80%, 6%)',
    },
  },
});

export function VighneshThemeProvider(props: PropsWithChildren<unknown>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}
