import React, { PropsWithChildren } from 'react';
import { createTheme, CssBaseline, Theme, ThemeProvider as MuiThemeProvider } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(216, 65%, 11%)',
      light: 'hsl(218, 58%, 16%)',
      dark: 'hsl(218, 80%, 6%)',
    },
    secondary: {
      main: 'hsl(166, 100%, 70%)',
    },
    text: {
      primary: 'hsl(226, 70%, 88%)',
    },
  },
});

export function VighneshThemeProvider(props: PropsWithChildren<{ theme?: Theme }>) {
  return (
    <MuiThemeProvider theme={props.theme ?? theme}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
}
