import React, { PropsWithChildren } from 'react';
import { alpha, createTheme, CssBaseline, Theme, ThemeProvider as MuiThemeProvider } from '@mui/material';

const primaryTextColor = 'hsl(226, 70%, 88%)';

export const theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(216, 65%, 11%)',
      light: 'hsl(218, 58%, 20%)',
      dark: 'hsl(218, 80%, 6%)',
    },
    secondary: {
      main: 'hsl(166, 100%, 70%)',
    },
    text: {
      primary: primaryTextColor,
      secondary: alpha(primaryTextColor, 0.65),
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        component: 'p',
      },
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
