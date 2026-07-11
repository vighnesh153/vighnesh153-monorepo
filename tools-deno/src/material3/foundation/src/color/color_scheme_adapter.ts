import type { DynamicScheme } from "@material/material-color-utilities";

import { ColorScheme } from "./color_scheme.ts";
import { Color } from "./color.ts";

export class ColorSchemeAdapter {
  static fromDynamicScheme(
    dynamicScheme: DynamicScheme,
  ): ColorScheme {
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
      onPrimaryFixedVariant: Color.fromArgb(
        dynamicScheme.onPrimaryFixedVariant,
      ),
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
}
