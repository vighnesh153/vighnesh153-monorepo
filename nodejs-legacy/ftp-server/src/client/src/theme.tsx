import { ReactElement } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export const theme = createTheme();

export interface ThemeProviderProps {
  children: ReactElement;
}

export function ThemeProvider(props: ThemeProviderProps): ReactElement {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
}
