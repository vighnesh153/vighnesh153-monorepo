import { argbFromHex, Hct } from "@material/material-color-utilities";

export class Color {
  // r - 0 to 255
  // g - 0 to 255
  // b - 0 to 255
  static fromRgb(r: number, g: number, b: number): Color {
    return this.fromRgba(r, g, b, 255);
  }

  // r - 0 to 255
  // g - 0 to 255
  // b - 0 to 255
  // a - 0 to 255
  static fromRgba(r: number, g: number, b: number, a: number): Color {
    const argb =
      ((a & 255) << 24 | (r & 255) << 16 | (g & 255) << 8 | (b & 255)) >>> 0;
    return new Color(argb);
  }

  // h - 0 to 360
  // s - 0 to 100
  // l - 0 to 100
  static fromHsl(h: number, s: number, l: number): Color {
    return this.fromHsla(h, s, l, 255);
  }

  // h - 0 to 360
  // s - 0 to 100
  // l - 0 to 100
  // a - 0 to 255
  static fromHsla(h: number, s: number, l: number, a: number): Color {
    // Ensure h is wrapped safely within [0, 360) even if negative or >= 360
    const normalizedH = ((h % 360) + 360) % 360;

    const normalizedS = s / 100;
    const normalizedL = l / 100;

    // Calculate chroma helper
    const chromaHelper = normalizedS * Math.min(normalizedL, 1 - normalizedL);

    // Conversion formula for channel offset n (0 for Red, 8 for Green, 4 for Blue)
    const f = (n: number): number => {
      const k = (n + normalizedH / 30) % 12;
      const colorFloat = normalizedL -
        chromaHelper * Math.max(-1, Math.min(k - 3, 9 - k, 1));
      return Math.round(colorFloat * 255);
    };

    const red = f(0);
    const green = f(8);
    const blue = f(4);

    return this.fromRgba(red, green, blue, Math.round(a));
  }

  /**
   * @param hue 0 <= hue < 360; invalid values are corrected.
   * @param chroma 0 <= chroma < ?; Informally, colorfulness. The color
   *     returned may be lower than the requested chroma. Chroma has a different
   *     maximum for any given hue and tone.
   * @param tone 0 <= tone <= 100; invalid values are corrected.
   */
  static fromHct(h: number, c: number, t: number): Color {
    return new Color(Hct.from(h, c, t).toInt());
  }

  static fromHex(hexCode: string): Color {
    return new Color(argbFromHex(hexCode));
  }

  static fromArgb(argb: number): Color {
    return new Color(argb);
  }

  private constructor(private readonly argb: number) {}
}
