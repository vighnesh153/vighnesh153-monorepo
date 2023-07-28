export interface ParseCodeOperatorsOptions {
  operators: string;
}

type ParseCodeOperatorsResult = Array<{
  isOperator: boolean;
  value: string;
}>;

export function parseCodeOperators(code: string, options: ParseCodeOperatorsOptions): ParseCodeOperatorsResult {
  const { operators } = options;
  return code
    .split('')
    .map((ch) => ({
      isOperator: operators.includes(ch),
      value: ch,
    }))
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
