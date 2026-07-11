import {
  type DynamicScheme,
  Hct,
  SchemeExpressive,
  SchemeFruitSalad,
  SchemeRainbow,
  SchemeTonalSpot,
  SchemeVibrant,
} from "@material/material-color-utilities";
import type { ColorScheme } from "./color_scheme.ts";
import type { Color } from "./color.ts";
import { ColorSchemeAdapter } from "./color_scheme_adapter.ts";

export const dynamicColorSchemeDefaults = {
  variant: "tonal-spot" as const,
  contrastLevel: 0,
  isDark: false,
  specVersion: "2025" as const, // TODO: update to 2026 when available
  platform: "phone" as const,
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

  /**
   * @default 0
   */
  contrastLevel?: number;

  /**
   * @default '2025'
   */
  specVersion?: "2025";

  /**
   * @default 'phone'
   */
  platform?: "phone" | "watch";
}

export function createDynamicColorScheme(
  {
    sourceColor,
    variant = dynamicColorSchemeDefaults.variant,
    contrastLevel = dynamicColorSchemeDefaults.contrastLevel,
    isDark = dynamicColorSchemeDefaults.isDark,
    specVersion = dynamicColorSchemeDefaults.specVersion,
    platform = dynamicColorSchemeDefaults.platform,
  }: DynamicColorSchemeOptions,
): ColorScheme {
  const sourceColorHct = Hct.fromInt(sourceColor.asArgb());
  let scheme: DynamicScheme;

  switch (variant) {
    case "tonal-spot":
      scheme = new SchemeTonalSpot(
        /** sourceColorHct= */ sourceColorHct,
        /** isDark= */ isDark,
        /** contrastLevel= */ contrastLevel,
        /** specVersion= */ specVersion,
        /** platform= */ platform,
      );
      break;
    case "vibrant":
      scheme = new SchemeVibrant(
        /** sourceColorHct= */ sourceColorHct,
        /** isDark= */ isDark,
        /** contrastLevel= */ contrastLevel,
        /** specVersion= */ specVersion,
        /** platform= */ platform,
      );
      break;
    case "fruit-salad":
      scheme = new SchemeFruitSalad(
        /** sourceColorHct= */ sourceColorHct,
        /** isDark= */ isDark,
        /** contrastLevel= */ contrastLevel,
        /** specVersion= */ specVersion,
        /** platform= */ platform,
      );
      break;
    case "expressive":
      scheme = new SchemeExpressive(
        /** sourceColorHct= */ sourceColorHct,
        /** isDark= */ isDark,
        /** contrastLevel= */ contrastLevel,
        /** specVersion= */ specVersion,
        /** platform= */ platform,
      );
      break;
    case "rainbow":
      scheme = new SchemeRainbow(
        /** sourceColorHct= */ sourceColorHct,
        /** isDark= */ isDark,
        /** contrastLevel= */ contrastLevel,
        /** specVersion= */ specVersion,
        /** platform= */ platform,
      );
      break;
    default:
      throw new Error(`Unknown variant: ${variant}`);
  }

  return ColorSchemeAdapter.fromDynamicScheme(scheme);
}
