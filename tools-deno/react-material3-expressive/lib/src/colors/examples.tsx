import { useEffect } from "react";

import {
  Color,
  type ColorScheme,
  createDarkBaselineColorScheme,
  createDynamicColorScheme,
  createLightBaselineColorScheme,
} from "./mod.ts";

function ThemeTable(
  { title, scheme }: { title: string; scheme: ColorScheme },
) {
  const colors = scheme.values;

  const box = (color: Color, textColor: Color, label: string) => (
    <div
      style={{
        width: 200,
        height: 50,
        background: color.hex,
        color: textColor.hex,
        display: "grid",
        placeItems: "center",
        border: "1px solid black",
        borderRadius: 5,
      }}
    >
      {label} - {color.hex}
    </div>
  );

  useEffect(() => {
    console.log(title, colors);
  }, []);

  return (
    <div>
      <h2>{title}</h2>
      {box(colors.primary, colors.onPrimary, "primary")}
      {box(colors.onPrimary, colors.primary, "onPrimary")}
      {box(
        colors.primaryContainer,
        colors.onPrimaryContainer,
        "primaryContainer",
      )}
      {box(
        colors.onPrimaryContainer,
        colors.primaryContainer,
        "onPrimaryContainer",
      )}

      {box(colors.secondary, colors.onSecondary, "secondary")}
      {box(colors.onSecondary, colors.secondary, "onSecondary")}
      {box(
        colors.secondaryContainer,
        colors.onSecondaryContainer,
        "secondaryContainer",
      )}
      {box(
        colors.onSecondaryContainer,
        colors.secondaryContainer,
        "onSecondaryContainer",
      )}

      {box(colors.tertiary, colors.onTertiary, "tertiary")}
      {box(colors.onTertiary, colors.tertiary, "onTertiary")}
      {box(
        colors.tertiaryContainer,
        colors.onTertiaryContainer,
        "tertiaryContainer",
      )}
      {box(
        colors.onTertiaryContainer,
        colors.tertiaryContainer,
        "onTertiaryContainer",
      )}

      {box(colors.error, colors.onError, "error")}
      {box(colors.onError, colors.error, "onError")}
      {box(colors.errorContainer, colors.onErrorContainer, "errorContainer")}
      {box(colors.onErrorContainer, colors.errorContainer, "onErrorContainer")}

      {box(colors.surface, colors.onSurface, "surface")}
      {box(colors.onSurface, colors.surface, "onSurface")}
      {box(colors.surfaceVariant, colors.onSurfaceVariant, "surfaceVariant")}
      {box(colors.onSurfaceVariant, colors.surfaceVariant, "onSurfaceVariant")}

      {box(
        colors.surfaceContainerHighest,
        colors.onSurface,
        "surfaceContainerHighest",
      )}
      {box(
        colors.surfaceContainerHigh,
        colors.onSurface,
        "surfaceContainerHigh",
      )}
      {box(colors.surfaceContainer, colors.onSurface, "surfaceContainer")}
      {box(colors.surfaceContainerLow, colors.onSurface, "surfaceContainerLow")}
      {box(
        colors.surfaceContainerLowest,
        colors.onSurface,
        "surfaceContainerLowest",
      )}

      {box(colors.inverseSurface, colors.inverseOnSurface, "inverseSurface")}
      {box(colors.inverseOnSurface, colors.inverseSurface, "inverseOnSurface")}

      {box(colors.outline, colors.outlineVariant, "outline")}
      {box(colors.outlineVariant, colors.outline, "outlineVariant")}

      {/** Add-ons */}

      {box(colors.primaryFixed, colors.onPrimaryFixed, "primaryFixed")}
      {box(colors.onPrimaryFixed, colors.primaryFixed, "onPrimaryFixed")}
      {box(
        colors.primaryFixedDim,
        colors.onPrimaryFixedVariant,
        "primaryFixedDim",
      )}
      {box(
        colors.onPrimaryFixedVariant,
        colors.primaryFixedDim,
        "primaryFixedVariant",
      )}
      {box(colors.inversePrimary, colors.primary, "inversePrimary")}

      {box(colors.secondaryFixed, colors.onSecondaryFixed, "secondaryFixed")}
      {box(colors.onSecondaryFixed, colors.secondaryFixed, "onSecondaryFixed")}
      {box(
        colors.secondaryFixedDim,
        colors.onSecondaryFixedVariant,
        "secondaryFixedDim",
      )}
      {box(
        colors.onSecondaryFixedVariant,
        colors.secondaryFixedDim,
        "secondaryFixedVariant",
      )}

      {box(colors.tertiaryFixed, colors.onTertiaryFixed, "tertiaryFixed")}
      {box(colors.onTertiaryFixed, colors.tertiaryFixed, "onTertiaryFixed")}
      {box(
        colors.tertiaryFixedDim,
        colors.onTertiaryFixedVariant,
        "tertiaryFixedDim",
      )}
      {box(
        colors.onTertiaryFixedVariant,
        colors.tertiaryFixedDim,
        "tertiaryFixedVariant",
      )}

      {box(colors.background, colors.onBackground, "background")}
      {box(colors.onBackground, colors.background, "onBackground")}
      {box(colors.surfaceBright, colors.onSurface, "surfaceBright")}
      {box(colors.surfaceDim, colors.onSurface, "surfaceDim")}
      {box(colors.scrim, colors.secondaryFixed, "scrim")}
      {box(colors.shadow, colors.secondaryFixed, "shadow")}
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "flex" }}>
      <ThemeTable title="Light" scheme={createLightBaselineColorScheme()} />
      <ThemeTable title="Dark" scheme={createDarkBaselineColorScheme()} />
      <ThemeTable
        title="Green (Tonal Spot)"
        scheme={createDynamicColorScheme({
          sourceColor: Color.fromHex("#00ff00"),
          isDark: true,
        })}
      />
      <ThemeTable
        title="Green (Expressive)"
        scheme={createDynamicColorScheme({
          sourceColor: Color.fromHex("#00ff00"),
          isDark: true,
          variant: "expressive",
        })}
      />
    </div>
  );
}
