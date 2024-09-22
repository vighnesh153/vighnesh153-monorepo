export type SerializedTokenType = {
  value: string;
};

export class KotlinTokenType {
  static Illegal = new KotlinTokenType('Illegal');
  static Eof = new KotlinTokenType('Eof');

  static Identifier = new KotlinTokenType('Identifier');
  static SingleLineComment = new KotlinTokenType('SingleLineComment');
  static MultiLineComment = new KotlinTokenType('MultiLineComment');
  static IntegerLiteral = new KotlinTokenType('IntegerLiteral');
  static FloatLiteral = new KotlinTokenType('FloatLiteral');
  static LongLiteral = new KotlinTokenType('LongLiteral');
  static DoubleLiteral = new KotlinTokenType('DoubleLiteral');
  static StringLiteral = new KotlinTokenType('StringLiteral');
  static CharacterLiteral = new KotlinTokenType('CharacterLiteral');

  static Plus = new KotlinTokenType('+');
  static PlusEquals = new KotlinTokenType('+=');
  static DoublePlus = new KotlinTokenType('++');

  static Hyphen = new KotlinTokenType('-');
  static HyphenEquals = new KotlinTokenType('-=');
  static DoubleHyphen = new KotlinTokenType('--');
  static HyphenRightAngleBracket = new KotlinTokenType('->');

  static Asterisk = new KotlinTokenType('*');
  static AsteriskEquals = new KotlinTokenType('*=');

  static ForwardSlash = new KotlinTokenType('/');
  static ForwardSlashEquals = new KotlinTokenType('/=');

  static Modulus = new KotlinTokenType('%');
  static ModulusEquals = new KotlinTokenType('%=');

  static Equals = new KotlinTokenType('=');
  static DoubleEquals = new KotlinTokenType('==');
  static TripleEquals = new KotlinTokenType('===');

  static DoubleAmpersand = new KotlinTokenType('&&');
  static DoubleVerticalBar = new KotlinTokenType('||');

  static Bang = new KotlinTokenType('!');
  static DoubleBang = new KotlinTokenType('!!');
  static BangEquals = new KotlinTokenType('!=');
  static BangDoubleEquals = new KotlinTokenType('!==');

  static LeftAngleBracket = new KotlinTokenType('<');
  static LeftAngleBracketEquals = new KotlinTokenType('<=');

  static RightAngleBracket = new KotlinTokenType('>');
  static RightAngleBracketEquals = new KotlinTokenType('>=');

  static LeftSquareBracket = new KotlinTokenType('[');
  static RightSquareBracket = new KotlinTokenType(']');

  static QuestionMark = new KotlinTokenType('?');
  static QuestionMarkDot = new KotlinTokenType('?.');
  static QuestionMarkColon = new KotlinTokenType('?:');

  static Colon = new KotlinTokenType(':');
  static DoubleColon = new KotlinTokenType('::');

  static Dot = new KotlinTokenType('.');
  static DoubleDot = new KotlinTokenType('..');
  static DoubleDotLeftAngleBracket = new KotlinTokenType('..<');

  static At = new KotlinTokenType('@');

  static Semicolon = new KotlinTokenType(';');

  static Dollar = new KotlinTokenType('$');

  static Underscore = new KotlinTokenType('_');

  private constructor(public readonly value: string) {}
}

export const operatorTokens = [
  KotlinTokenType.Plus,
  KotlinTokenType.PlusEquals,
  KotlinTokenType.DoublePlus,
  KotlinTokenType.Hyphen,
  KotlinTokenType.HyphenEquals,
  KotlinTokenType.DoubleHyphen,
  KotlinTokenType.HyphenRightAngleBracket,
  KotlinTokenType.Asterisk,
  KotlinTokenType.AsteriskEquals,
  KotlinTokenType.ForwardSlash,
  KotlinTokenType.ForwardSlashEquals,
  KotlinTokenType.Modulus,
  KotlinTokenType.ModulusEquals,
  KotlinTokenType.Equals,
  KotlinTokenType.DoubleEquals,
  KotlinTokenType.TripleEquals,
  KotlinTokenType.DoubleAmpersand,
  KotlinTokenType.DoubleVerticalBar,
  KotlinTokenType.Bang,
  KotlinTokenType.DoubleBang,
  KotlinTokenType.BangEquals,
  KotlinTokenType.BangDoubleEquals,
  KotlinTokenType.LeftAngleBracket,
  KotlinTokenType.LeftAngleBracketEquals,
  KotlinTokenType.RightAngleBracket,
  KotlinTokenType.RightAngleBracketEquals,
  KotlinTokenType.LeftSquareBracket,
  KotlinTokenType.RightSquareBracket,
  KotlinTokenType.QuestionMark,
  KotlinTokenType.QuestionMarkDot,
  KotlinTokenType.QuestionMarkColon,
  KotlinTokenType.Colon,
  KotlinTokenType.DoubleColon,
  KotlinTokenType.Dot,
  KotlinTokenType.DoubleDot,
  KotlinTokenType.DoubleDotLeftAngleBracket,
  KotlinTokenType.At,
  KotlinTokenType.Semicolon,
  KotlinTokenType.Dollar,
  KotlinTokenType.Underscore,
];
