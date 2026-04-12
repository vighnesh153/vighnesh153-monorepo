import type { Color } from "./color.ts";

export interface ColorSchemeValues {
  /**
   * Primary colors
   */
  primary: Color;
  onPrimary: Color;
  primaryContainer: Color;
  onPrimaryContainer: Color;

  /**
   * Secondary colors
   */
  secondary: Color;
  onSecondary: Color;
  secondaryContainer: Color;
  onSecondaryContainer: Color;

  /**
   * Tertiary colors
   */
  tertiary: Color;
  onTertiary: Color;
  tertiaryContainer: Color;
  onTertiaryContainer: Color;

  /**
   * Error colors
   */
  error: Color;
  onError: Color;
  errorContainer: Color;
  onErrorContainer: Color;

  /**
   * Surface colors
   */
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

  /**
   * Outline colors
   */
  outline: Color;
  outlineVariant: Color;

  /** Add-ons */

  /**
   * Add-on primary colors
   */
  primaryFixed: Color;
  onPrimaryFixed: Color;
  primaryFixedDim: Color;
  onPrimaryFixedVariant: Color;
  inversePrimary: Color;

  /**
   * Add-on secondary colors
   */
  secondaryFixed: Color;
  onSecondaryFixed: Color;
  secondaryFixedDim: Color;
  onSecondaryFixedVariant: Color;

  /**
   * Add-on tertiary colors
   */
  tertiaryFixed: Color;
  onTertiaryFixed: Color;
  tertiaryFixedDim: Color;
  onTertiaryFixedVariant: Color;

  /**
   * Add-on surface colors
   */
  background: Color;
  onBackground: Color;
  surfaceBright: Color;
  surfaceDim: Color;
  scrim: Color;
  shadow: Color;
}

export class ColorScheme {
  constructor(
    readonly values: ColorSchemeValues,
  ) {}

  copy(overrides: Partial<ColorSchemeValues> = {}): ColorScheme {
    return new ColorScheme({
      ...this.values,
      ...overrides,
    });
  }
}
