import {
  type DynamicScheme,
  SchemeExpressive,
  SchemeFruitSalad,
  SchemeMonochrome,
  SchemeRainbow,
  SchemeTonalSpot,
  SchemeVibrant,
} from "@material/material-color-utilities";
import { ColorScheme } from "./color_scheme.ts";
import { Hct } from "./hct.ts";
import { Color } from "./color.ts";

const defaults = {
  variant: "tonal-spot" as const,
  contrastLevel: 0,
  isDark: false,
  specVersion: "2025" as const, // TODO: update to 2026 when available
};

export interface DynamicColorSchemeOptions {
  /** Seed color for generating the scheme. */
  sourceColor: Color;

  /**
   * @default 'tonal-spot'
   */
  variant?: "tonal-spot" | "vibrant" | "fruit-salad" | "expressive" | "rainbow";

  /** @default false */
  isDark?: boolean;

  /** @default 0 */
  contrastLevel?: number;

  specVersion?: "2025";
}

export function createDynamicColorScheme(
  {
    sourceColor,
    variant = defaults.variant,
    contrastLevel = defaults.contrastLevel,
    isDark = defaults.isDark,
    specVersion = defaults.specVersion,
  }: DynamicColorSchemeOptions,
): ColorScheme {
  let scheme: DynamicScheme;

  switch (variant) {
    case "tonal-spot":
      scheme = new SchemeTonalSpot(
        /** sourceColorHct= */ sourceColor.hct,
        /** isDark= */ isDark,
        /** contrastLevel= */ contrastLevel,
        /** specVersion= */ specVersion,
        /** platform= */ "phone",
      );
      break;
    case "vibrant":
      scheme = new SchemeVibrant(
        /** sourceColorHct= */ sourceColor.hct,
        /** isDark= */ isDark,
        /** contrastLevel= */ contrastLevel,
        /** specVersion= */ specVersion,
        /** platform= */ "phone",
      );
      break;
    case "fruit-salad":
      scheme = new SchemeFruitSalad(
        /** sourceColorHct= */ sourceColor.hct,
        /** isDark= */ isDark,
        /** contrastLevel= */ contrastLevel,
        /** specVersion= */ specVersion,
        /** platform= */ "phone",
      );
      break;
    case "expressive":
      scheme = new SchemeExpressive(
        /** sourceColorHct= */ sourceColor.hct,
        /** isDark= */ isDark,
        /** contrastLevel= */ contrastLevel,
        /** specVersion= */ specVersion,
        /** platform= */ "phone",
      );
      break;
    case "rainbow":
      scheme = new SchemeRainbow(
        /** sourceColorHct= */ sourceColor.hct,
        /** isDark= */ isDark,
        /** contrastLevel= */ contrastLevel,
        /** specVersion= */ specVersion,
        /** platform= */ "phone",
      );
      break;
    default:
      throw new Error(`Unknown variant: ${variant}`);
  }

  return convertToColorScheme(scheme);
}

export function createMonochromeColorScheme(
  {
    contrastLevel = defaults.contrastLevel,
    isDark = defaults.isDark,
    specVersion = defaults.specVersion,
  }: Pick<
    DynamicColorSchemeOptions,
    "contrastLevel" | "isDark" | "specVersion"
  > = {},
): ColorScheme {
  const monochromeScheme = new SchemeMonochrome(
    /** sourceColorHct= */ Hct.from(0, 0, 0),
    /** isDark= */ isDark,
    /** contrastLevel= */ contrastLevel,
    /** specVersion= */ specVersion,
    /** platform= */ "phone",
  );
  return convertToColorScheme(monochromeScheme);
}

function convertToColorScheme(dynamicScheme: DynamicScheme): ColorScheme {
  return new ColorScheme({
    primary: Color.fromArgb(dynamicScheme.primary),
    onPrimary: Color.fromArgb(dynamicScheme.onPrimary),
    primaryContainer: Color.fromArgb(dynamicScheme.primaryContainer),
    onPrimaryContainer: Color.fromArgb(dynamicScheme.onPrimaryContainer),
    secondary: Color.fromArgb(dynamicScheme.secondary),
    onSecondary: Color.fromArgb(dynamicScheme.onSecondary),
    secondaryContainer: Color.fromArgb(dynamicScheme.secondaryContainer),
    onSecondaryContainer: Color.fromArgb(dynamicScheme.onSecondaryContainer),
    tertiary: Color.fromArgb(dynamicScheme.tertiary),
    onTertiary: Color.fromArgb(dynamicScheme.onTertiary),
    tertiaryContainer: Color.fromArgb(dynamicScheme.tertiaryContainer),
    onTertiaryContainer: Color.fromArgb(dynamicScheme.onTertiaryContainer),
    error: Color.fromArgb(dynamicScheme.error),
    onError: Color.fromArgb(dynamicScheme.onError),
    errorContainer: Color.fromArgb(dynamicScheme.errorContainer),
    onErrorContainer: Color.fromArgb(dynamicScheme.onErrorContainer),
    surface: Color.fromArgb(dynamicScheme.surface),
    onSurface: Color.fromArgb(dynamicScheme.onSurface),
    surfaceVariant: Color.fromArgb(dynamicScheme.surfaceVariant),
    onSurfaceVariant: Color.fromArgb(dynamicScheme.onSurfaceVariant),
    surfaceContainerHighest: Color.fromArgb(
      dynamicScheme.surfaceContainerHighest,
    ),
    surfaceContainerHigh: Color.fromArgb(dynamicScheme.surfaceContainerHigh),
    surfaceContainer: Color.fromArgb(dynamicScheme.surfaceContainer),
    surfaceContainerLow: Color.fromArgb(dynamicScheme.surfaceContainerLow),
    surfaceContainerLowest: Color.fromArgb(
      dynamicScheme.surfaceContainerLowest,
    ),
    inverseSurface: Color.fromArgb(dynamicScheme.inverseSurface),
    inverseOnSurface: Color.fromArgb(dynamicScheme.inverseOnSurface),
    outline: Color.fromArgb(dynamicScheme.outline),
    outlineVariant: Color.fromArgb(dynamicScheme.outlineVariant),
    primaryFixed: Color.fromArgb(dynamicScheme.primaryFixed),
    onPrimaryFixed: Color.fromArgb(dynamicScheme.onPrimaryFixed),
    primaryFixedDim: Color.fromArgb(dynamicScheme.primaryFixedDim),
    onPrimaryFixedVariant: Color.fromArgb(dynamicScheme.onPrimaryFixedVariant),
    inversePrimary: Color.fromArgb(dynamicScheme.inversePrimary),
    secondaryFixed: Color.fromArgb(dynamicScheme.secondaryFixed),
    onSecondaryFixed: Color.fromArgb(dynamicScheme.onSecondaryFixed),
    secondaryFixedDim: Color.fromArgb(dynamicScheme.secondaryFixedDim),
    onSecondaryFixedVariant: Color.fromArgb(
      dynamicScheme.onSecondaryFixedVariant,
    ),
    tertiaryFixed: Color.fromArgb(dynamicScheme.tertiaryFixed),
    onTertiaryFixed: Color.fromArgb(dynamicScheme.onTertiaryFixed),
    tertiaryFixedDim: Color.fromArgb(dynamicScheme.tertiaryFixedDim),
    onTertiaryFixedVariant: Color.fromArgb(
      dynamicScheme.onTertiaryFixedVariant,
    ),
    background: Color.fromArgb(dynamicScheme.background),
    onBackground: Color.fromArgb(dynamicScheme.onBackground),
    surfaceBright: Color.fromArgb(dynamicScheme.surfaceBright),
    surfaceDim: Color.fromArgb(dynamicScheme.surfaceDim),
    scrim: Color.fromArgb(dynamicScheme.scrim),
    shadow: Color.fromArgb(dynamicScheme.shadow),
  });
}
