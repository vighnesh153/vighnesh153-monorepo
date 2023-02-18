import { slugify } from './slugify';

describe('"slugify" tests', () => {
  it('should throw if "slugify" is invoked on "undefined"', () => {
    expect(() => slugify(undefined as unknown as string)).toThrowErrorMatchingInlineSnapshot(
      `"Expected type string, found "undefined""`
    );
  });

  it('should replace whitespaces with replacement', () => {
    expect(slugify('foo bar baz')).toEqual('foo-bar-baz');
    expect(slugify('foo bar baz', { fallbackReplacement: '+' })).toEqual('foo+bar+baz');
    expect(slugify('foo bar baz', { fallbackReplacement: '' })).toEqual('foobarbaz');
  });

  it('should remove duplicates of the replacement character', () => {
    expect(slugify('foo , bar')).toBe('foo-bar');
  });

  it('should remove trailing space if any', () => {
    expect(slugify(' foo bar baz ')).toEqual('foo-bar-baz');
  });

  it('should remove not allowed chars', () => {
    expect(slugify('foo, bar baz')).toEqual('foo-bar-baz');
    expect(slugify('foo- bar baz')).toEqual('foo-bar-baz');
    expect(slugify('foo] bar baz')).toEqual('foo-bar-baz');
    expect(slugify('foo  bar--baz')).toEqual('foo-bar-baz');
  });

  it('should leave allowed chars', () => {
    const allowed = ['+', '.', '(', ')', ':', '@', '"', `'`, '*', '~', '!'];
    allowed.forEach((symbol) => {
      expect(slugify(`foo ${symbol} bar baz`)).toEqual(`foo-${symbol}-bar-baz`);
    });
  });

  it('should leave custom allowed characters', () => {
    const allowed = ['#', '^'];
    allowed.forEach((symbol) => {
      expect(slugify(`foo ${symbol} bar baz`, { allowedCharacters: /[#^]/ })).toEqual(`foo-${symbol}-bar-baz`);
    });
  });

  it('should remove the options.remove characters', () => {
    expect(slugify('foo *+~.() bar \'"!:@ baz', { remove: /[$*_+~.()'"!\-:@]/g })).toEqual('foo-bar-baz');
    expect(slugify('foo bar, bar foo, foo bar', { remove: /[^a-zA-Z0-9 -]/ })).toEqual('foo-bar-bar-foo-foo-bar');
  });

  it('should convert to lower case if options.convertToLowerCase is true', () => {
    expect(slugify('Foo bAr baZ', { convertToLowerCase: true })).toEqual('foo-bar-baz');
  });

  it('should remove non-acceptable characters (except replacement character) if options.strict is true', () => {
    expect(slugify(`foo_bar~* -@'"!-baz!`, { strict: true })).toEqual('foo_bar-baz');
  });

  it(
    'should dedupe consecutive replacement chars when options.replacement is true ' +
      'and should remove unacceptable characters when options.strict is true',
    () => {
      expect(
        slugify('foo_@_bar-baz!', {
          fallbackReplacement: '_',
          strict: true,
        })
      ).toEqual('foo_barbaz');
    }
  );

  it('should replace latin chars', () => {
    const charMap = new Map();
    charMap.set('À', 'A');
    charMap.set('Á', 'A');
    charMap.set('Â', 'A');
    charMap.set('Ã', 'A');
    charMap.set('Ä', 'A');
    charMap.set('Å', 'A');
    charMap.set('Æ', 'AE');
    charMap.set('Ç', 'C');
    charMap.set('È', 'E');
    charMap.set('É', 'E');
    charMap.set('Ê', 'E');
    charMap.set('Ë', 'E');
    charMap.set('Ì', 'I');
    charMap.set('Í', 'I');
    charMap.set('Î', 'I');
    charMap.set('Ï', 'I');
    charMap.set('Ð', 'D');
    charMap.set('Ñ', 'N');
    charMap.set('Ò', 'O');
    charMap.set('Ó', 'O');
    charMap.set('Ô', 'O');
    charMap.set('Õ', 'O');
    charMap.set('Ö', 'O');
    charMap.set('Ő', 'O');
    charMap.set('Ø', 'O');
    charMap.set('Ù', 'U');
    charMap.set('Ú', 'U');
    charMap.set('Û', 'U');
    charMap.set('Ü', 'U');
    charMap.set('Ű', 'U');
    charMap.set('Ý', 'Y');
    charMap.set('Þ', 'TH');
    charMap.set('ß', 'ss');
    charMap.set('à', 'a');
    charMap.set('á', 'a');
    charMap.set('â', 'a');
    charMap.set('ã', 'a');
    charMap.set('ä', 'a');
    charMap.set('å', 'a');
    charMap.set('æ', 'ae');
    charMap.set('ç', 'c');
    charMap.set('è', 'e');
    charMap.set('é', 'e');
    charMap.set('ê', 'e');
    charMap.set('ë', 'e');
    charMap.set('ì', 'i');
    charMap.set('í', 'i');
    charMap.set('î', 'i');
    charMap.set('ï', 'i');
    charMap.set('ð', 'd');
    charMap.set('ñ', 'n');
    charMap.set('ò', 'o');
    charMap.set('ó', 'o');
    charMap.set('ô', 'o');
    charMap.set('õ', 'o');
    charMap.set('ö', 'o');
    charMap.set('ő', 'o');
    charMap.set('ø', 'o');
    charMap.set('ù', 'u');
    charMap.set('ú', 'u');
    charMap.set('û', 'u');
    charMap.set('ü', 'u');
    charMap.set('ű', 'u');
    charMap.set('ý', 'y');
    charMap.set('þ', 'th');
    charMap.set('ÿ', 'y');
    charMap.set('ẞ', 'SS');

    Array.from(charMap.keys()).forEach((character) => {
      expect(slugify(`foo ${character} bar baz`, { convertToLowerCase: false })).toEqual(
        `foo-${charMap.get(character)}-bar-baz`
      );
    });
  });

  it('should replace greek chars', () => {
    const charMap = new Map();
    charMap.set('α', 'a');
    charMap.set('β', 'b');
    charMap.set('γ', 'g');
    charMap.set('δ', 'd');
    charMap.set('ε', 'e');
    charMap.set('ζ', 'z');
    charMap.set('η', 'h');
    charMap.set('θ', '8');
    charMap.set('ι', 'i');
    charMap.set('κ', 'k');
    charMap.set('λ', 'l');
    charMap.set('μ', 'm');
    charMap.set('ν', 'n');
    charMap.set('ξ', '3');
    charMap.set('ο', 'o');
    charMap.set('π', 'p');
    charMap.set('ρ', 'r');
    charMap.set('σ', 's');
    charMap.set('τ', 't');
    charMap.set('υ', 'y');
    charMap.set('φ', 'f');
    charMap.set('χ', 'x');
    charMap.set('ψ', 'ps');
    charMap.set('ω', 'w');
    charMap.set('ά', 'a');
    charMap.set('έ', 'e');
    charMap.set('ί', 'i');
    charMap.set('ό', 'o');
    charMap.set('ύ', 'y');
    charMap.set('ή', 'h');
    charMap.set('ώ', 'w');
    charMap.set('ς', 's');
    charMap.set('ϊ', 'i');
    charMap.set('ΰ', 'y');
    charMap.set('ϋ', 'y');
    charMap.set('ΐ', 'i');
    charMap.set('Α', 'A');
    charMap.set('Β', 'B');
    charMap.set('Γ', 'G');
    charMap.set('Δ', 'D');
    charMap.set('Ε', 'E');
    charMap.set('Ζ', 'Z');
    charMap.set('Η', 'H');
    charMap.set('Θ', '8');
    charMap.set('Ι', 'I');
    charMap.set('Κ', 'K');
    charMap.set('Λ', 'L');
    charMap.set('Μ', 'M');
    charMap.set('Ν', 'N');
    charMap.set('Ξ', '3');
    charMap.set('Ο', 'O');
    charMap.set('Π', 'P');
    charMap.set('Ρ', 'R');
    charMap.set('Σ', 'S');
    charMap.set('Τ', 'T');
    charMap.set('Υ', 'Y');
    charMap.set('Φ', 'F');
    charMap.set('Χ', 'X');
    charMap.set('Ψ', 'PS');
    charMap.set('Ω', 'W');
    charMap.set('Ά', 'A');
    charMap.set('Έ', 'E');
    charMap.set('Ί', 'I');
    charMap.set('Ό', 'O');
    charMap.set('Ύ', 'Y');
    charMap.set('Ή', 'H');
    charMap.set('Ώ', 'W');
    charMap.set('Ϊ', 'I');
    charMap.set('Ϋ', 'Y');

    Array.from(charMap.keys()).forEach((character) => {
      expect(slugify(`foo ${character} bar baz`, { convertToLowerCase: false })).toEqual(
        `foo-${charMap.get(character)}-bar-baz`
      );
    });
  });

  it('should replace turkish chars', () => {
    const charMap = new Map();
    charMap.set('ş', 's');
    charMap.set('Ş', 'S');
    charMap.set('ı', 'i');
    charMap.set('İ', 'I');
    charMap.set('ç', 'c');
    charMap.set('Ç', 'C');
    charMap.set('ü', 'u');
    charMap.set('Ü', 'U');
    charMap.set('ö', 'o');
    charMap.set('Ö', 'O');
    charMap.set('ğ', 'g');
    charMap.set('Ğ', 'G');

    Array.from(charMap.keys()).forEach((character) => {
      expect(slugify(`foo ${character} bar baz`, { convertToLowerCase: false })).toEqual(
        `foo-${charMap.get(character)}-bar-baz`
      );
    });
  });

  it('should replace cyrillic chars', () => {
    const charMap = new Map();
    charMap.set('а', 'a');
    charMap.set('б', 'b');
    charMap.set('в', 'v');
    charMap.set('г', 'g');
    charMap.set('д', 'd');
    charMap.set('е', 'e');
    charMap.set('ё', 'yo');
    charMap.set('ж', 'zh');
    charMap.set('з', 'z');
    charMap.set('и', 'i');
    charMap.set('й', 'j');
    charMap.set('к', 'k');
    charMap.set('л', 'l');
    charMap.set('м', 'm');
    charMap.set('н', 'n');
    charMap.set('о', 'o');
    charMap.set('п', 'p');
    charMap.set('р', 'r');
    charMap.set('с', 's');
    charMap.set('т', 't');
    charMap.set('у', 'u');
    charMap.set('ф', 'f');
    charMap.set('х', 'h');
    charMap.set('ц', 'c');
    charMap.set('ч', 'ch');
    charMap.set('ш', 'sh');
    charMap.set('щ', 'sh');
    charMap.set('ъ', 'u');
    charMap.set('ы', 'y');
    charMap.set('ь', '');
    charMap.set('э', 'e');
    charMap.set('ю', 'yu');
    charMap.set('я', 'ya');
    charMap.set('А', 'A');
    charMap.set('Б', 'B');
    charMap.set('В', 'V');
    charMap.set('Г', 'G');
    charMap.set('Д', 'D');
    charMap.set('Е', 'E');
    charMap.set('Ё', 'Yo');
    charMap.set('Ж', 'Zh');
    charMap.set('З', 'Z');
    charMap.set('И', 'I');
    charMap.set('Й', 'J');
    charMap.set('К', 'K');
    charMap.set('Л', 'L');
    charMap.set('М', 'M');
    charMap.set('Н', 'N');
    charMap.set('О', 'O');
    charMap.set('П', 'P');
    charMap.set('Р', 'R');
    charMap.set('С', 'S');
    charMap.set('Т', 'T');
    charMap.set('У', 'U');
    charMap.set('Ф', 'F');
    charMap.set('Х', 'H');
    charMap.set('Ц', 'C');
    charMap.set('Ч', 'Ch');
    charMap.set('Ш', 'Sh');
    charMap.set('Щ', 'Sh');
    charMap.set('Ъ', 'U');
    charMap.set('Ы', 'Y');
    charMap.set('Э', 'E');
    charMap.set('Ю', 'Yu');
    charMap.set('Я', 'Ya');
    charMap.set('Є', 'Ye');
    charMap.set('І', 'I');
    charMap.set('Ї', 'Yi');
    charMap.set('Ґ', 'G');
    charMap.set('є', 'ye');
    charMap.set('і', 'i');
    charMap.set('ї', 'yi');
    charMap.set('ґ', 'g');

    Array.from(charMap.keys()).forEach((character) => {
      const expected = charMap.get(character) ? `foo-${charMap.get(character)}-bar-baz` : 'foo-bar-baz';
      expect(slugify(`foo ${character} bar baz`, { convertToLowerCase: false })).toEqual(expected);
    });
  });

  it('should replace kazakh cyrillic chars', () => {
    const charMap = new Map();
    charMap.set('Ә', 'AE');
    charMap.set('ә', 'ae');
    charMap.set('Ғ', 'GH');
    charMap.set('ғ', 'gh');
    charMap.set('Қ', 'KH');
    charMap.set('қ', 'kh');
    charMap.set('Ң', 'NG');
    charMap.set('ң', 'ng');
    charMap.set('Ү', 'UE');
    charMap.set('ү', 'ue');
    charMap.set('Ұ', 'U');
    charMap.set('ұ', 'u');
    charMap.set('Һ', 'H');
    charMap.set('һ', 'h');
    charMap.set('Ө', 'OE');
    charMap.set('ө', 'oe');

    Array.from(charMap.keys()).forEach((character) => {
      const expected = charMap.get(character) ? `foo-${charMap.get(character)}-bar-baz` : 'foo-bar-baz';
      expect(slugify(`foo ${character} bar baz`, { convertToLowerCase: false })).toEqual(expected);
    });
  });

  it('should replace czech chars', () => {
    const charMap = new Map();
    charMap.set('č', 'c');
    charMap.set('ď', 'd');
    charMap.set('ě', 'e');
    charMap.set('ň', 'n');
    charMap.set('ř', 'r');
    charMap.set('š', 's');
    charMap.set('ť', 't');
    charMap.set('ů', 'u');
    charMap.set('ž', 'z');
    charMap.set('Č', 'C');
    charMap.set('Ď', 'D');
    charMap.set('Ě', 'E');
    charMap.set('Ň', 'N');
    charMap.set('Ř', 'R');
    charMap.set('Š', 'S');
    charMap.set('Ť', 'T');
    charMap.set('Ů', 'U');
    charMap.set('Ž', 'Z');

    Array.from(charMap.keys()).forEach((character) => {
      expect(slugify(`foo ${character} bar baz`, { convertToLowerCase: false })).toEqual(
        `foo-${charMap.get(character)}-bar-baz`
      );
    });
  });

  it('should replace polish chars', () => {
    const charMap = new Map();
    charMap.set('ą', 'a');
    charMap.set('ć', 'c');
    charMap.set('ę', 'e');
    charMap.set('ł', 'l');
    charMap.set('ń', 'n');
    charMap.set('ó', 'o');
    charMap.set('ś', 's');
    charMap.set('ź', 'z');
    charMap.set('ż', 'z');
    charMap.set('Ą', 'A');
    charMap.set('Ć', 'C');
    charMap.set('Ę', 'e');
    charMap.set('Ł', 'L');
    charMap.set('Ń', 'N');
    charMap.set('Ś', 'S');
    charMap.set('Ź', 'Z');
    charMap.set('Ż', 'Z');

    Array.from(charMap.keys()).forEach((character) => {
      expect(slugify(`foo ${character} bar baz`, { convertToLowerCase: false })).toEqual(
        `foo-${charMap.get(character)}-bar-baz`
      );
    });
  });

  it('should replace latvian chars', () => {
    const charMap = new Map();
    charMap.set('ā', 'a');
    charMap.set('č', 'c');
    charMap.set('ē', 'e');
    charMap.set('ģ', 'g');
    charMap.set('ī', 'i');
    charMap.set('ķ', 'k');
    charMap.set('ļ', 'l');
    charMap.set('ņ', 'n');
    charMap.set('š', 's');
    charMap.set('ū', 'u');
    charMap.set('ž', 'z');
    charMap.set('Ā', 'A');
    charMap.set('Č', 'C');
    charMap.set('Ē', 'E');
    charMap.set('Ģ', 'G');
    charMap.set('Ī', 'i');
    charMap.set('Ķ', 'k');
    charMap.set('Ļ', 'L');
    charMap.set('Ņ', 'N');
    charMap.set('Š', 'S');
    charMap.set('Ū', 'u');
    charMap.set('Ž', 'Z');

    Array.from(charMap.keys()).forEach((character) => {
      expect(slugify(`foo ${character} bar baz`, { convertToLowerCase: false })).toEqual(
        `foo-${charMap.get(character)}-bar-baz`
      );
    });
  });

  it('should replace serbian chars', () => {
    const charMap = new Map();
    charMap.set('đ', 'dj');
    charMap.set('ǌ', 'nj');
    charMap.set('ǉ', 'lj');
    charMap.set('Đ', 'DJ');
    charMap.set('ǋ', 'NJ');
    charMap.set('ǈ', 'LJ');
    charMap.set('ђ', 'dj');
    charMap.set('ј', 'j');
    charMap.set('љ', 'lj');
    charMap.set('њ', 'nj');
    charMap.set('ћ', 'c');
    charMap.set('џ', 'dz');
    charMap.set('Ђ', 'DJ');
    charMap.set('Ј', 'J');
    charMap.set('Љ', 'LJ');
    charMap.set('Њ', 'NJ');
    charMap.set('Ћ', 'C');
    charMap.set('Џ', 'DZ');

    Array.from(charMap.keys()).forEach((character) => {
      expect(slugify(`foo ${character} bar baz`, { convertToLowerCase: false })).toEqual(
        `foo-${charMap.get(character)}-bar-baz`
      );
    });
  });

  it('should replace currencies', () => {
    const charMap = new Map();
    charMap.set('€', 'euro');
    charMap.set('₢', 'cruzeiro');
    charMap.set('₣', 'french franc');
    charMap.set('£', 'pound');
    charMap.set('₤', 'lira');
    charMap.set('₥', 'mill');
    charMap.set('₦', 'naira');
    charMap.set('₧', 'peseta');
    charMap.set('₨', 'rupee');
    charMap.set('₩', 'won');
    charMap.set('₪', 'new shequel');
    charMap.set('₫', 'dong');
    charMap.set('₭', 'kip');
    charMap.set('₮', 'tugrik');
    charMap.set('₸', 'kazakhstani tenge');
    charMap.set('₯', 'drachma');
    charMap.set('₰', 'penny');
    charMap.set('₱', 'peso');
    charMap.set('₲', 'guarani');
    charMap.set('₳', 'austral');
    charMap.set('₴', 'hryvnia');
    charMap.set('₵', 'cedi');
    charMap.set('¢', 'cent');
    charMap.set('¥', 'yen');
    charMap.set('元', 'yuan');
    charMap.set('円', 'yen');
    charMap.set('﷼', 'rial');
    charMap.set('₠', 'ecu');
    charMap.set('¤', 'currency');
    charMap.set('฿', 'baht');
    charMap.set('$', 'dollar');
    charMap.set('₽', 'russian ruble');
    charMap.set('₿', 'bitcoin');
    charMap.set('₺', 'turkish lira');

    Array.from(charMap.keys()).forEach((character) => {
      const value = charMap.get(character).replace(' ', '-');
      expect(slugify(`foo ${character} bar baz`, { convertToLowerCase: false })).toEqual(`foo-${value}-bar-baz`);
    });
  });

  it('should replace symbols', () => {
    const charMap = new Map();
    charMap.set('©', '(c)');
    charMap.set('œ', 'oe');
    charMap.set('Œ', 'OE');
    charMap.set('∑', 'sum');
    charMap.set('®', '(r)');
    charMap.set('†', '+');
    charMap.set('“', '"');
    charMap.set('”', '"');
    charMap.set('‘', `'`);
    charMap.set('’', `'`);
    charMap.set('∂', 'd');
    charMap.set('ƒ', 'f');
    charMap.set('™', 'tm');
    charMap.set('℠', 'sm');
    charMap.set('…', '...');
    charMap.set('˚', 'o');
    charMap.set('º', 'o');
    charMap.set('ª', 'a');
    charMap.set('•', '*');
    charMap.set('∆', 'delta');
    charMap.set('∞', 'infinity');
    charMap.set('♥', 'love');
    charMap.set('&', 'and');
    charMap.set('|', 'or');
    charMap.set('<', 'less');
    charMap.set('>', 'greater');

    Array.from(charMap.keys()).forEach((character) => {
      expect(slugify(`foo ${character} bar baz`, { convertToLowerCase: false })).toEqual(
        `foo-${charMap.get(character)}-bar-baz`
      );
    });
  });

  it('should replace custom characters', () => {
    expect(slugify('unicode ♥ is ☢')).toEqual('unicode-love-is');

    expect(slugify('unicode ♥ is ☢', { replacementMap: { '☢': 'radioactive' } })).toEqual(
      'unicode-love-is-radioactive'
    );
  });

  it('should consolidate repeated replacement characters', () => {
    expect(slugify('day + night')).toEqual('day-+-night');

    // slugify.extend({'+': '-'})
    expect(slugify('day + night', { replacementMap: { '+': '-' } })).toEqual('day-night');
  });

  it('should normalize', () => {
    const slug = decodeURIComponent('%C3%A5%C3%A4%C3%B6-123'); // åäö-123
    expect(slugify(slug, { remove: /[*+~.()'"!:@]/g })).toEqual('aao-123');
  });

  it('should replace leading and trailing replacement chars', () => {
    expect(slugify('-Come on, fhqwhgads-', { convertToLowerCase: false })).toEqual('Come-on-fhqwhgads');
  });

  it('should preserve leading/trailing replacement characters if option set', () => {
    expect(slugify(' foo bar baz ', { trim: false })).toEqual('-foo-bar-baz-');
  });
});
