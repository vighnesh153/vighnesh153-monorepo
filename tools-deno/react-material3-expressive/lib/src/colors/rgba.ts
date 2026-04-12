export class Rgba {
  constructor(
    readonly r: number,
    readonly g: number,
    readonly b: number,
    readonly a: number,
  ) {}

  toString() {
    const { r, g, b, a } = this;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  copy(
    { r, g, b, a }: { r?: number; g?: number; b?: number; a?: number },
  ): Rgba {
    return new Rgba(
      r ?? this.r,
      g ?? this.g,
      b ?? this.b,
      a ?? this.a,
    );
  }
}
