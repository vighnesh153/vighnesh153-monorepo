import { Color } from "./color.ts";
import { ColorScheme } from "./color_scheme.ts";

/**
 * Tokens sourced from https://m3.material.io/styles/color/static/baseline
 */

/**
 * Creates a light baseline color scheme
 * @returns [ColorScheme]
 */
export function createLightBaselineColorScheme(): ColorScheme {
  return new ColorScheme({
    /**
     * Primary colors
     */
    primary: Color.fromHex("#6750A4"),
    onPrimary: Color.fromHex("#FFFFFF"),
    primaryContainer: Color.fromHex("#EADDFF"),
    onPrimaryContainer: Color.fromHex("#4F378B"),
    /**
     * Secondary colors
     */
    secondary: Color.fromHex("#625B71"),
    onSecondary: Color.fromHex("#FFFFFF"),
    secondaryContainer: Color.fromHex("#E8DEF8"),
    onSecondaryContainer: Color.fromHex("#4A4458"),
    /**
     * Tertiary colors
     */
    tertiary: Color.fromHex("#7D5260"),
    onTertiary: Color.fromHex("#FFFFFF"),
    tertiaryContainer: Color.fromHex("#FFD8E4"),
    onTertiaryContainer: Color.fromHex("#633B48"),
    /**
     * Error colors
     */
    error: Color.fromHex("#B3261E"),
    onError: Color.fromHex("#FFFFFF"),
    errorContainer: Color.fromHex("#F9DEDC"),
    onErrorContainer: Color.fromHex("#8C1D18"),
    /**
     * Surface colors
     */
    surface: Color.fromHex("#FEF7FF"),
    onSurface: Color.fromHex("#1D1B20"),
    surfaceVariant: Color.fromHex("#E7E0EC"),
    onSurfaceVariant: Color.fromHex("#49454F"),
    surfaceContainerHighest: Color.fromHex("#E6E0E9"),
    surfaceContainerHigh: Color.fromHex("#ECE6F0"),
    surfaceContainer: Color.fromHex("#F3EDF7"),
    surfaceContainerLow: Color.fromHex("#F7F2FA"),
    surfaceContainerLowest: Color.fromHex("#FFFFFF"),
    inverseSurface: Color.fromHex("#322F35"),
    inverseOnSurface: Color.fromHex("#F5EFF7"),
    /**
     * Outline colors
     */
    outline: Color.fromHex("#79747E"),
    outlineVariant: Color.fromHex("#CAC4D0"),
    /**
     * Add-on primary colors
     */
    primaryFixed: Color.fromHex("#EADDFF"),
    onPrimaryFixed: Color.fromHex("#21005D"),
    primaryFixedDim: Color.fromHex("#D0BCFF"),
    onPrimaryFixedVariant: Color.fromHex("#4F378B"),
    inversePrimary: Color.fromHex("#D0BCFF"),
    /**
     * Add-on secondary colors
     */
    secondaryFixed: Color.fromHex("#E8DEF8"),
    onSecondaryFixed: Color.fromHex("#1D192B"),
    secondaryFixedDim: Color.fromHex("#CCC2DC"),
    onSecondaryFixedVariant: Color.fromHex("#4A4458"),
    /**
     * Add-on tertiary colors
     */
    tertiaryFixed: Color.fromHex("#FFD8E4"),
    onTertiaryFixed: Color.fromHex("#31111D"),
    tertiaryFixedDim: Color.fromHex("#EFB8C8"),
    onTertiaryFixedVariant: Color.fromHex("#633B48"),
    /**
     * Add-on surface colors
     */
    background: Color.fromHex("#FEF7FF"),
    onBackground: Color.fromHex("#1D1B20"),
    surfaceBright: Color.fromHex("#FEF7FF"),
    surfaceDim: Color.fromHex("#DED8E1"),
    scrim: Color.fromHex("#000000"),
    shadow: Color.fromHex("#000000"),
  });
}

/**
 * Creates a dark baseline color scheme
 * @returns [ColorScheme]
 */
export function createDarkBaselineColorScheme(): ColorScheme {
  return new ColorScheme({
    /**
     * Primary colors
     */
    primary: Color.fromHex("#D0BCFF"),
    onPrimary: Color.fromHex("#381E72"),
    primaryContainer: Color.fromHex("#4F378B"),
    onPrimaryContainer: Color.fromHex("#EADDFF"),
    /**
     * Secondary colors
     */
    secondary: Color.fromHex("#CCC2DC"),
    onSecondary: Color.fromHex("#332D41"),
    secondaryContainer: Color.fromHex("#4A4458"),
    onSecondaryContainer: Color.fromHex("#E8DEF8"),
    /**
     * Tertiary colors
     */
    tertiary: Color.fromHex("#EFB8C8"),
    onTertiary: Color.fromHex("#492532"),
    tertiaryContainer: Color.fromHex("#633B48"),
    onTertiaryContainer: Color.fromHex("#FFD8E4"),
    /**
     * Error colors
     */
    error: Color.fromHex("#F2B8B5"),
    onError: Color.fromHex("#601410"),
    errorContainer: Color.fromHex("#8C1D18"),
    onErrorContainer: Color.fromHex("#F9DEDC"),
    /**
     * Surface colors
     */
    surface: Color.fromHex("#141218"),
    onSurface: Color.fromHex("#E6E0E9"),
    surfaceVariant: Color.fromHex("#E6E0E9"),
    onSurfaceVariant: Color.fromHex("#CAC4D0"),
    surfaceContainerHighest: Color.fromHex("#36343B"),
    surfaceContainerHigh: Color.fromHex("#2B2930"),
    surfaceContainer: Color.fromHex("#211F26"),
    surfaceContainerLow: Color.fromHex("#1D1B20"),
    surfaceContainerLowest: Color.fromHex("#0F0D13"),
    inverseSurface: Color.fromHex("#E6E0E9"),
    inverseOnSurface: Color.fromHex("#322F35"),
    /**
     * Outline colors
     */
    outline: Color.fromHex("#938F99"),
    outlineVariant: Color.fromHex("#49454F"),
    /**
     * Add-on primary colors
     */
    primaryFixed: Color.fromHex("#EADDFF"),
    onPrimaryFixed: Color.fromHex("#21005D"),
    primaryFixedDim: Color.fromHex("#D0BCFF"),
    onPrimaryFixedVariant: Color.fromHex("#4F378B"),
    inversePrimary: Color.fromHex("#6750A4"),
    /**
     * Add-on secondary colors
     */
    secondaryFixed: Color.fromHex("#E8DEF8"),
    onSecondaryFixed: Color.fromHex("#1D192B"),
    secondaryFixedDim: Color.fromHex("#CCC2DC"),
    onSecondaryFixedVariant: Color.fromHex("#4A4458"),
    /**
     * Add-on tertiary colors
     */
    tertiaryFixed: Color.fromHex("#FFD8E4"),
    onTertiaryFixed: Color.fromHex("#31111D"),
    tertiaryFixedDim: Color.fromHex("#EFB8C8"),
    onTertiaryFixedVariant: Color.fromHex("#633B48"),
    /**
     * Add-on surface colors
     */
    background: Color.fromHex("#141218"),
    onBackground: Color.fromHex("#E6E0E9"),
    surfaceBright: Color.fromHex("#3B383E"),
    surfaceDim: Color.fromHex("#141218"),
    scrim: Color.fromHex("#000000"),
    shadow: Color.fromHex("#000000"),
  });
}
