import { Hct, SchemeMonochrome } from "@material/material-color-utilities";

import type { ColorScheme } from "./color_scheme.ts";
import { ColorSchemeAdapter } from "./color_scheme_adapter.ts";

export const monochromeColorSchemeDefaults = {
  contrastLevel: 0,
  isDark: false,
  specVersion: "2025" as const, // TODO: update to 2026 when available
  platform: "phone" as const,
};

export interface MonochromeColorSchemeOptions {
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

export function createMonochromeColorScheme(
  {
    contrastLevel = monochromeColorSchemeDefaults.contrastLevel,
    isDark = monochromeColorSchemeDefaults.isDark,
    specVersion = monochromeColorSchemeDefaults.specVersion,
    platform = monochromeColorSchemeDefaults.platform,
  }: MonochromeColorSchemeOptions = {},
): ColorScheme {
  const monochromeScheme = new SchemeMonochrome(
    /** sourceColorHct= */ Hct.from(0, 0, 0),
    /** isDark= */ isDark,
    /** contrastLevel= */ contrastLevel,
    /** specVersion= */ specVersion,
    /** platform= */ platform,
  );
  return ColorSchemeAdapter.fromDynamicScheme(monochromeScheme);
}
