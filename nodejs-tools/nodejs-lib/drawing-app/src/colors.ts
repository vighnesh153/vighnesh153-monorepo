export type IColor = {
  hsl: string;
  rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  rgbaString: string;
};

export const Color = {
  Black: {
    hsl: 'hsl(0, 0%, 0%)',
    rgba: {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    },
    rgbaString: '',
  },
  Gray: {
    hsl: 'hsl(0, 0%, 34%)',
    rgba: {
      r: 87,
      g: 87,
      b: 87,
      a: 1,
    },
    rgbaString: '',
  },
  LightGray: {
    hsl: 'hsl(0, 0%, 63%)',
    rgba: {
      r: 161,
      g: 161,
      b: 161,
      a: 1,
    },
    rgbaString: '',
  },
  Purple: {
    hsl: 'hsl(291, 64%, 42%)',
    rgba: {
      r: 155,
      g: 39,
      b: 176,
      a: 1,
    },
    rgbaString: '',
  },
  LightBlue: {
    hsl: 'hsl(229, 100%, 81%)',
    rgba: {
      r: 158,
      g: 176,
      b: 255,
      a: 1,
    },
    rgbaString: '',
  },
  DarkBlue: {
    hsl: 'hsl(229, 68%, 50%)',
    rgba: {
      r: 41,
      g: 73,
      b: 214,
      a: 1,
    },
    rgbaString: '',
  },
  SkyBlue: {
    hsl: 'hsl(180, 67%, 49%)',
    rgba: {
      r: 41,
      g: 209,
      b: 209,
      a: 1,
    },
    rgbaString: '',
  },
  LightGreen: {
    hsl: 'hsl(114, 39%, 63%)',
    rgba: {
      r: 131,
      g: 197,
      b: 124,
      a: 1,
    },
    rgbaString: '',
  },
  Green: {
    hsl: 'hsl(122, 39%, 49%)',
    rgba: {
      r: 76,
      g: 174,
      b: 79,
      a: 1,
    },
    rgbaString: '',
  },
  LimeGreen: {
    hsl: 'hsl(73, 100%, 50%)',
    rgba: {
      r: 200,
      g: 255,
      b: 0,
      a: 1,
    },
    rgbaString: '',
  },
  Yellow: {
    hsl: 'hsl(55, 100%, 60%)',
    rgba: {
      r: 255,
      g: 238,
      b: 51,
      a: 1,
    },
    rgbaString: '',
  },
  Orange: {
    hsl: 'hsl(28, 100%, 60%)',
    rgba: {
      r: 255,
      g: 146,
      b: 51,
      a: 1,
    },
    rgbaString: '',
  },
  Peach: {
    hsl: 'hsl(46, 51%, 82%)',
    rgba: {
      r: 233,
      g: 222,
      b: 186,
      a: 1,
    },
    rgbaString: '',
  },
  Brown: {
    hsl: 'hsl(28, 68%, 30%)',
    rgba: {
      r: 129,
      g: 73,
      b: 24,
      a: 1,
    },
    rgbaString: '',
  },
  Pink: {
    hsl: 'hsl(339, 81%, 85%)',
    rgba: {
      r: 248,
      g: 186,
      b: 207,
      a: 1,
    },
    rgbaString: '',
  },
  Red: {
    hsl: 'hsl(4, 90%, 58%)',
    rgba: {
      r: 244,
      g: 64,
      b: 52,
      a: 1,
    },
    rgbaString: '',
  },
  DarkRed: {
    hsl: 'hsl(0, 66%, 41%)',
    rgba: {
      r: 174,
      g: 36,
      b: 36,
      a: 1,
    },
    rgbaString: '',
  },
  White: {
    hsl: 'hsl(0, 0%, 100%)',
    rgba: {
      r: 255,
      g: 255,
      b: 255,
      a: 1,
    },
    rgbaString: '',
  },
} satisfies Record<string, IColor>;

Object.keys(Color).forEach((colorKey) => {
  const colorObj = Color[colorKey as keyof typeof Color];
  const { r, g, b, a } = colorObj.rgba;
  colorObj.rgbaString = `rgba(${r}, ${g}, ${b}, ${a})`;
});
