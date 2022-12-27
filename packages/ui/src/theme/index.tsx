import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import React, { PropsWithChildren } from 'react';

export { useTheme } from '@mui/material';

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
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
}
