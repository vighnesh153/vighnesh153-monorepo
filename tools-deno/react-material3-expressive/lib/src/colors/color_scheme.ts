import type { Color } from "./color.ts";

export interface ColorScheme {
  primary: Color;
  onPrimary: Color;
  primaryContainer: Color;
  onPrimaryContainer: Color;
  secondary: Color;
  onSecondary: Color;
  secondaryContainer: Color;
  onSecondaryContainer: Color;
  tertiary: Color;
  onTertiary: Color;
  tertiaryContainer: Color;
  onTertiaryContainer: Color;
  error: Color;
  onError: Color;
  errorContainer: Color;
  onErrorContainer: Color;

  surface: Color;
  onSurface: Color;
  surfaceVariant: Color;
  onSurfaceVariant: Color;

  surfaceContainerHighest: Color;
  surfaceContainerHigh: Color;
  surfaceContainer: Color;
  surfaceContainerLow: Color;
  surfaceContainerLowest: Color;

  inverseSurface: Color;
  inverseOnSurface: Color;

  outline: Color;
  outlineVariant: Color;

  /** Add-ons */

  primaryFixed: Color;
  onPrimaryFixed: Color;
  primaryFixedDim: Color;
  onPrimaryFixedDim: Color;
  inversePrimary: Color;

  secondaryFixed: Color;
  onSecondaryFixed: Color;
  secondaryFixedDim: Color;
  onSecondaryFixedDim: Color;

  tertiaryFixed: Color;
  onTertiaryFixed: Color;
  tertiaryFixedDim: Color;
  onTertiaryFixedDim: Color;

  background: Color;
  onBackground: Color;
  surfaceBright: Color;
  surfaceDim: Color;
  scrim: Color;
  shadow: Color;
}
