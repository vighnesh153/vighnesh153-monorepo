export interface ParseCodeOperatorsOptions {
  operators: string;
}

type ParseCodeOperatorsResult = Array<{
  isOperator: boolean;
  value: string;
}>;

const mapping: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  // '"': '&quot;',
  // [`'`]: '&#39;',
};

export function parseCodeOperators(code: string, options: ParseCodeOperatorsOptions): ParseCodeOperatorsResult {
  const { operators } = options;
  return code
    .split('')
    .map((ch) => {
      const result = {
        isOperator: operators.includes(ch),
        value: mapping[ch] ?? ch,
      };
      return result;
    })
    .reduce((all, item) => {
      const last = all.at(-1);
      if (!last) {
        all.push(item);
      } else if (last.isOperator !== item.isOperator) {
        all.push(item);
      } else {
        last.value += item.value;
      }
      return all;
    }, [] as ParseCodeOperatorsResult);
}
